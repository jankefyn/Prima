namespace Archero {
  import ƒ = FudgeCore;
  import ƒAid = FudgeAid;

  enum STATE {
    IDLE, HUNT, SHOOT, DEAD, CHECK
  }

  export class StateMachine extends ƒAid.ComponentStateMachine<STATE> {
    public static readonly iSubclass: number = ƒ.Component.registerSubclass(StateMachine);
    private static instructions: ƒAid.StateMachineInstructions<STATE> = StateMachine.get();
    public static enemyShootingTimeout: boolean;
    constructor() {
      super();
      this.instructions = StateMachine.instructions; // setup instructions with the static set
      StateMachine.enemyShootingTimeout = false;
      // Don't start when running in editor
      if (ƒ.Project.mode == ƒ.MODE.EDITOR)
        return;
      // Listen to this component being added to or removed from a node
      this.addEventListener(ƒ.EVENT.COMPONENT_ADD, this.hndEvent);
      this.addEventListener(ƒ.EVENT.COMPONENT_REMOVE, this.hndEvent);
      this.addEventListener(ƒ.EVENT.NODE_DESERIALIZED, this.hndEvent);
    }

    public static get(): ƒAid.StateMachineInstructions<STATE> {
      let setup: ƒAid.StateMachineInstructions<STATE> = new ƒAid.StateMachineInstructions();
      setup.transitDefault = StateMachine.transitDefault;
      setup.actDefault = StateMachine.actDefault;
      setup.setAction(STATE.IDLE, <ƒ.General>this.actIdle);
      setup.setAction(STATE.HUNT, <ƒ.General>this.actHunt);
      setup.setAction(STATE.SHOOT, <ƒ.General>this.actShoot);
      setup.setAction(STATE.DEAD, <ƒ.General>this.actDead);
      setup.setAction(STATE.CHECK, <ƒ.General>this.actCheck);
      return setup;
    }
    private static transitDefault(_machine: StateMachine): void {
      //console.log("Transit to", _machine.stateNext);
    }

    private static async actDefault(_machine: StateMachine): Promise<void> {
      //console.log(STATE[_machine.stateCurrent]);
    }

    private static async actIdle(_machine: StateMachine): Promise<void> {
      let distance: ƒ.Vector3 = ƒ.Vector3.DIFFERENCE(character.mtxWorld.translation, _machine.node.mtxWorld.translation);
      if (distance.magnitude < 10) {
        _machine.transit(STATE.HUNT);
      }
    }
    private static async actHunt(_machine: StateMachine): Promise<void> {
      let distance: ƒ.Vector3 = ƒ.Vector3.DIFFERENCE(character.mtxWorld.translation, _machine.node.mtxWorld.translation);
      let direction: ƒ.Vector3 = new ƒ.Vector3;
      lastEnemyPosition.mtxLocal = _machine.node.cmpTransform.mtxLocal.clone;
      _machine.node.cmpTransform.mtxLocal.scale(new ƒ.Vector3(0.5, 0.5, 0.5))
      _machine.node.cmpTransform.mtxLocal.rotation = new ƒ.Vector3(0, 0, 0);
      direction = _machine.node.cmpTransform.mtxLocal.getTranslationTo(transformcharacter.mtxLocal);
      direction.normalize();
      direction = ƒ.Vector3.SCALE(direction, ƒ.Loop.timeFrameGame / 1000);
      //direction.scale(enemySpeed);
      _machine.node.cmpTransform.mtxLocal.translate(direction);
      _machine.node.cmpTransform.mtxLocal.scale(new ƒ.Vector3(2, 2, 2))
      _machine.node.cmpTransform.mtxLocal.rotation = new ƒ.Vector3(90, 90, 0);
      if (distance.magnitude > 10) {
        _machine.transit(STATE.IDLE);
      } else if (distance.magnitude < 5 && !this.enemyShootingTimeout) {
        _machine.transit(STATE.SHOOT);
      }
    }

    private static async actShoot(_machine: StateMachine): Promise<void> {
      if (this.enemyShootingTimeout) {
        _machine.transit(STATE.HUNT);
        return;
      }
      let enemyCube: ƒ.Node = new ƒ.Node("enemyCube" + enemy_bullet_counter);
      let enemyBulletMesh: ƒ.MeshCube = new ƒ.MeshCube("enemyCubeMesh" + enemy_bullet_counter);
      let componentMesh: ƒ.ComponentMesh = new ƒ.ComponentMesh(enemyBulletMesh);
      let material: ƒ.Material = new ƒ.Material("enemyCubeShader" + enemy_bullet_counter, ƒ.ShaderLitTextured);
      let enemyBulletCoat: ƒ.CoatTextured = new ƒ.CoatTextured(undefined, enemyBulletImage);
      material.coat = enemyBulletCoat;
      let materialComp: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(material);
      enemyCube.addComponent(materialComp);
      let cmpMat: ƒ.ComponentMaterial = enemyCube.getComponent(ƒ.ComponentMaterial);
      cmpMat.material = material;
      new ƒ.CoatTextured();
      enemyCube.addComponent(componentMesh);
      enemyCube.addComponent(materialComp);
      enemyCube.addComponent(new ƒ.ComponentTransform());
      enemyCube.cmpTransform.mtxLocal.scale(new ƒ.Vector3(3,3, 3))
      viewport.getBranch().addChild(enemyCube);
      currentEnemyBullets.push(viewport.getBranch().getChildrenByName("enemyCube" + enemy_bullet_counter)[0])
      currentEnemyBullets[enemy_bullet_counter].cmpTransform.mtxLocal = _machine.node.mtxLocal.clone;
      currentEnemyBullets[enemy_bullet_counter].cmpTransform.mtxLocal.scale(new ƒ.Vector3(0.5, 0.5, 0.5))
      currentEnemyBullets[enemy_bullet_counter].cmpTransform.mtxLocal.rotation = new ƒ.Vector3(0, 0, 0);
      enemy_bullet_direction[enemy_bullet_counter] = currentEnemyBullets[enemy_bullet_counter].cmpTransform.mtxLocal.getTranslationTo(transformcharacter.mtxLocal);
      enemy_bullet_counter++
      this.enemyShootingTimeout = true;
      setTimeout(() => {
        this.enemyShootingTimeout = false;
      }, enemyAttackspeed);

    }
    private static async actDead(_machine: StateMachine): Promise<void> {
      console.log("i am Dead");
    }
    private static async actCheck(_machine: StateMachine): Promise<void> {
      if (closestEnemy == _machine.node) {
        _machine.transit(STATE.DEAD)
      }
      else (
        _machine.transit(STATE.IDLE)
      )
    }

    // Activate the functions of this component as response to events
    private hndEvent = (_event: Event): void => {
      switch (_event.type) {
        case ƒ.EVENT.COMPONENT_ADD:
          ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, this.update);
          this.transit(STATE.IDLE);
          break;
        case ƒ.EVENT.COMPONENT_REMOVE:
          this.removeEventListener(ƒ.EVENT.COMPONENT_ADD, this.hndEvent);
          this.removeEventListener(ƒ.EVENT.COMPONENT_REMOVE, this.hndEvent);
          ƒ.Loop.removeEventListener(ƒ.EVENT.LOOP_FRAME, this.update);
          break;
        case ƒ.EVENT.NODE_DESERIALIZED:
          this.transit(STATE.IDLE);
          break;
      }
    }
    private update = (_event: Event): void => {
      this.act();
      if (closestEnemy.enemyLiveAmount < 10) {
        this.transit(STATE.CHECK);
      }
    }
  }
}