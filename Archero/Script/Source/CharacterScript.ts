namespace Archero {
  import ƒ = FudgeCore;
  ƒ.Project.registerScriptNamespace(Archero);  // Register the namespace to FUDGE for serialization

  export class CharacterScript extends ƒ.ComponentScript {
    // Register the script as component for use in the editor via drag&drop
    public static readonly iSubclass: number = ƒ.Component.registerSubclass(CharacterScript);
    characterIsMoving: boolean = false;

    constructor() {
      super();

      // Don't start when running in editor
      if (ƒ.Project.mode == ƒ.MODE.EDITOR)
        return;

      // Listen to this component being added to or removed from a node
      this.addEventListener(ƒ.EVENT.COMPONENT_ADD, this.hndEvent);
      this.addEventListener(ƒ.EVENT.COMPONENT_REMOVE, this.hndEvent);
      this.addEventListener(ƒ.EVENT.NODE_DESERIALIZED, this.hndEvent);
    }

    // Activate the functions of this component as response to events
    public hndEvent = (_event: Event): void => {
      switch (_event.type) {
        case ƒ.EVENT.COMPONENT_ADD:
          ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, this.update);
          break;
        case ƒ.EVENT.COMPONENT_REMOVE:
          this.removeEventListener(ƒ.EVENT.COMPONENT_ADD, this.hndEvent);
          this.removeEventListener(ƒ.EVENT.COMPONENT_REMOVE, this.hndEvent);
          break;
        case ƒ.EVENT.NODE_DESERIALIZED:
          break;
      }
    }
    walkLeft() {
      lastPosition.mtxLocal = transformcharacter.mtxLocal.clone;
      transformcharacter.mtxLocal.translateZ(-(characterSpeed * ƒ.Loop.timeFrameGame / 1000));
      this.characterIsMoving = true;
    }
    walkRight() {
      lastPosition.mtxLocal = transformcharacter.mtxLocal.clone;
      transformcharacter.mtxLocal.translateZ((characterSpeed * ƒ.Loop.timeFrameGame / 1000));
      this.characterIsMoving = true;
    }
    walkForward() {
      lastPosition.mtxLocal = transformcharacter.mtxLocal.clone;
      transformcharacter.mtxLocal.translateX(characterSpeed * ƒ.Loop.timeFrameGame / 1000);
      this.characterIsMoving = true;
    }
    walkBackwards() {
      lastPosition.mtxLocal = transformcharacter.mtxLocal.clone;
      transformcharacter.mtxLocal.translateX(-(characterSpeed * ƒ.Loop.timeFrameGame / 1000));
      this.characterIsMoving = true;
    }
    walkLeftForward() {
      lastPosition.mtxLocal = transformcharacter.mtxLocal.clone;
      transformcharacter.mtxLocal.translateZ(-((characterSpeed * ƒ.Loop.timeFrameGame / 1000) / 2));
      transformcharacter.mtxLocal.translateX(((characterSpeed * ƒ.Loop.timeFrameGame / 1000) / 2));
      this.characterIsMoving = true;
    }
    walkRightForward() {
      lastPosition.mtxLocal = transformcharacter.mtxLocal.clone;
      transformcharacter.mtxLocal.translateZ(((characterSpeed * ƒ.Loop.timeFrameGame / 1000) / 2));
      transformcharacter.mtxLocal.translateX(((characterSpeed * ƒ.Loop.timeFrameGame / 1000) / 2));
      this.characterIsMoving = true;
    }
    walkLeftBackwards() {
      lastPosition.mtxLocal = transformcharacter.mtxLocal.clone;
      transformcharacter.mtxLocal.translateZ(-((characterSpeed * ƒ.Loop.timeFrameGame / 1000) / 2));
      transformcharacter.mtxLocal.translateX(-((characterSpeed * ƒ.Loop.timeFrameGame / 1000) / 2));
      this.characterIsMoving = true;
    }
    walkRightBackwards() {
      lastPosition.mtxLocal = transformcharacter.mtxLocal.clone;
      transformcharacter.mtxLocal.translateZ(((characterSpeed * ƒ.Loop.timeFrameGame / 1000) / 2));
      transformcharacter.mtxLocal.translateX(-((characterSpeed * ƒ.Loop.timeFrameGame / 1000) / 2));
      this.characterIsMoving = true;
    }
    private update = (_event: Event): void => {  
      if (!this.characterIsMoving && closestEnemy != undefined ) {
        this.node.dispatchEvent(new Event("charShoots", { bubbles: true }));
      }

    }

  }

}