namespace Archero {
  import ƒ = FudgeCore;
  ƒ.Debug.info("Main Program Template running!");

  let obstaclePositions: ƒ.Node[];
  let bullet_counter: number = 0;
  let bulletspeed: number = 8;
  let enemyBulletSpeed: number = 5;
  let currentBullets: ƒ.Node[] = [];
  let audioShoot: ƒ.Audio = new ƒ.Audio("Script/Source/sounds/Bow_Shot_01.wav");
  let audioMove: ƒ.Audio = new ƒ.Audio("Script/Source/sounds/Small_Run_Sequence_02.wav");
  let cmpAudio: ƒ.ComponentAudio;
  let attackspeed: number = 1000;
  let alreadyChecked: boolean = false;
  let playerScript: CharacterScript;
  let playerImmune: boolean = false;
  let enemyImmune: boolean = false;
  let immunityTime: number = 500;
  let bulletImage: ƒ.TextureImage = new ƒ.TextureImage();
  let amountEnemys: number = 1;
  let playerBulletDirection: ƒ.Vector3[] = [];
  let characterNode: CharacterNode;
 /* let enemyAngleRad: number;
  let enemyAngleDeg: number;
  let playerAngleRad: number;
  let playerAngleDeg: number;
  let turnAngle: number;
  */
  let target: ƒ.ComponentTransform;

  export let enemyBulletImage: ƒ.TextureImage = new ƒ.TextureImage();
  export let shootingTimeOut: boolean = false;
  export let closestEnemyNumber: number = 0;
  export let closestEnemy: EnemyNode;
  export let enemyArray: EnemyNode[] = [];
  export let characterSpeed: number = 3;
  export let enemySpeed: number = 4;
  export let lastPosition: ƒ.ComponentTransform = new ƒ.ComponentTransform();
  export let lastEnemyPosition: ƒ.ComponentTransform = new ƒ.ComponentTransform();
  export let characterImage: ƒ.TextureImage = new ƒ.TextureImage();
  export let reloadImage: ƒ.TextureImage = new ƒ.TextureImage();
  export let EnemyImage: ƒ.TextureImage = new ƒ.TextureImage();
  export let enemyAttackspeed: number = 1000;
  export let transformcharacter: ƒ.ComponentTransform = new ƒ.ComponentTransform();
  export let viewport: ƒ.Viewport;
  export let character: ƒ.Node;
  export let gameState: GameState;
  export let enemy_bullet_counter: number = 0;
  export let enemy_bullet_direction: ƒ.Vector3[] = [];
  export let currentEnemyBullets: ƒ.Node[] = [];


  interface Serialized {
    [key: string]: any;
  }

  function fromJSON(_json: Serialized): void {
    attackspeed = _json.attackspeed;
    bulletspeed = _json.bulletspeed;
    enemyAttackspeed = _json.enemyAttackspeed;
    enemyBulletSpeed = _json.enemyBulletspeed;
  }
  async function loadJson(_path: string): Promise<JSON> {
    let response: Response = await fetch(_path);
    let json: JSON = await response.json();

    return json;
  }

  document.addEventListener("interactiveViewportStarted", <EventListener><unknown>start);


  async function start(_event: CustomEvent): Promise<void> {
    viewport = _event.detail;
    viewport.camera.mtxPivot.translation = new ƒ.Vector3(6, 25, 6);
    viewport.camera.mtxPivot.rotateY(90);
    viewport.camera.mtxPivot.rotateX(90);
    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    let branch: ƒ.Node = viewport.getBranch();
    branch.addEventListener("charShoots", shoot);
    await EnemyImage.load("Script/Source/Images/fire_Monster.png");
    await characterImage.load("Script/Source/Images/shooterGif.png");
    await reloadImage.load("Script/Source/Images/reload.png");
    await bulletImage.load("Script/Source/Images/shooterGif.png");
    await enemyBulletImage.load("Script/Source/Images/Feuerball.png");
    character = branch.getChildrenByName("Character")[0];
    playerScript = new CharacterScript();
    target = new ƒ.ComponentTransform();
    character.addComponent(playerScript);
    character.removeComponent(character.getComponent(ƒ.ComponentMaterial));
    obstaclePositions = branch.getChildrenByName("Obstacles");
    cmpAudio = new ƒ.ComponentAudio(audioShoot, false, false);
    cmpAudio.connect(true);
    ƒ.Loop.start(ƒ.LOOP_MODE.TIME_GAME, 200);
    let json: Serialized = await loadJson("Script/Source/data.json");
    fromJSON(json);
    gameState = new GameState();
    characterNode = new CharacterNode();
    character.addChild(characterNode);
    spawnEnenys();
    getClosestEnemy();
  }

  function update(_event: Event): void {
    if (gameState.liveAmount < 10) {
      console.log("ich bin hier");
      gameState.liveAmount = 0;
      gameState.text = "YOU ARE DEAD , RELOAD SITE TO START AGAIN";
      return
    }
    // ƒ.Physics.simulate();  // if physics is included and used
    transformcharacter = character.getComponent(ƒ.ComponentTransform);
    getClosestEnemy();
    if (closestEnemy != undefined) {
      checkCollision();
      checkEnemyCollision();
      checkBulletEnemyCollision();
      checkBulletObsCollision(currentBullets, false);
      checkBulletObsCollision(currentEnemyBullets, true);
      checkBulletCharCollision(currentEnemyBullets);
      focusTarget();
      viewport.draw();
      //console.log(closestEnemy);

      

     /* enemyAngleRad = Math.atan2(target.mtxLocal.translation.x, target.mtxLocal.translation.z);
      enemyAngleDeg = enemyAngleRad * (180.0 / Math.PI);
      playerAngleRad = Math.atan2(transformcharacter.mtxLocal.translation.x, transformcharacter.mtxLocal.translation.z);
      playerAngleDeg = playerAngleRad * (180.0 / Math.PI);
      if (enemyAngleDeg < playerAngleDeg) {
        turnAngle = playerAngleDeg - enemyAngleDeg;
      } else {
        turnAngle = enemyAngleDeg - playerAngleDeg;
      }


      characterNode.cmpTransform.mtxLocal.rotation = new ƒ.Vector3(90, turnAngle, 0);
*/
      ƒ.AudioManager.default.update();
      if (ƒ.Keyboard.isPressedCombo([ƒ.KEYBOARD_CODE.D, ƒ.KEYBOARD_CODE.W])) {
        playerScript.walkRightForward();
        characterNode.changeAnim("walk");
      }
      else if (ƒ.Keyboard.isPressedCombo([ƒ.KEYBOARD_CODE.A, ƒ.KEYBOARD_CODE.W])) {
        playerScript.walkLeftForward();
        characterNode.changeAnim("walk");
      }
      else if (ƒ.Keyboard.isPressedCombo([ƒ.KEYBOARD_CODE.D, ƒ.KEYBOARD_CODE.S])) {
        playerScript.walkRightBackwards();
        characterNode.changeAnim("walk");
      }
      else if (ƒ.Keyboard.isPressedCombo([ƒ.KEYBOARD_CODE.A, ƒ.KEYBOARD_CODE.S])) {
        playerScript.walkLeftBackwards();
        characterNode.changeAnim("walk");
      }
      else if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.D])) {
        playerScript.walkRight();
        characterNode.changeAnim("walk");
      }
      else if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.S])) {
        playerScript.walkBackwards();
        characterNode.changeAnim("walk");
      }
      else if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.A])) {
        playerScript.walkLeft();
        characterNode.changeAnim("walk");
      }
      else if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.W])) {
        playerScript.walkForward();
        characterNode.changeAnim("walk");
      }
      else {
        playerScript.characterIsMoving = false;
        alreadyChecked = false;
      }
      for (let i: number = 0; i < currentBullets.length; i++) {

        playerBulletDirection[i].normalize();
        playerBulletDirection[i] = ƒ.Vector3.SCALE(playerBulletDirection[i], ƒ.Loop.timeFrameGame / 1000);
        playerBulletDirection[i].scale(bulletspeed);
        if (playerBulletDirection[i].magnitude! > 0) {
          currentBullets[i].cmpTransform.mtxLocal.translateX(((bulletspeed * ƒ.Loop.timeFrameGame / 1000) / 2));
        }
        currentBullets[i].cmpTransform.mtxLocal.translate(playerBulletDirection[i]);


        //currentBullets[i].cmpTransform.mtxLocal.translateX(bulletspeed * ƒ.Loop.timeFrameGame / 1000);
      }
      for (let i: number = 0; i < currentEnemyBullets.length; i++) {
        enemy_bullet_direction[i].normalize();
        enemy_bullet_direction[i] = ƒ.Vector3.SCALE(enemy_bullet_direction[i], ƒ.Loop.timeFrameGame / 1000);
        enemy_bullet_direction[i].scale(enemyBulletSpeed);
        currentEnemyBullets[i].cmpTransform.mtxLocal.translate(enemy_bullet_direction[i]);
      }
      if (playerScript.characterIsMoving && !alreadyChecked) {
        alreadyChecked = true;
        cmpAudio.play(false);
        cmpAudio.setAudio(audioMove);
        cmpAudio.volume = 4;
        cmpAudio.loop;
        cmpAudio.play(true);
      }
    }
  }
  function spawnEnenys(): void {
    for (let i = 0; i < amountEnemys; i++) {
      let enemyNode = new EnemyNode("enemy" + i, new ƒ.Vector3(Math.floor(Math.random() * (12 - 10 + 1) + 10), 0, Math.floor(Math.random() * (7 + 1))));
      enemyNode.addComponent(new StateMachine());
      viewport.getBranch().addChild(enemyNode);
      enemyArray.push(enemyNode);
    }
  }
  function focusTarget(): void {
    target.mtxLocal = closestEnemy.cmpTransform.mtxLocal.clone;
    target.mtxLocal.scale(new ƒ.Vector3(0.5, 0.5, 0.5))
    target.mtxLocal.rotation = new ƒ.Vector3(0, 0, 0);
  }
  function shoot(): void {
    if (!shootingTimeOut) {
      characterNode.changeAnim("shoot");
      let nodeCube: ƒ.Node = new ƒ.Node("cube" + bullet_counter);
      let bulletMesh: ƒ.MeshCube = new ƒ.MeshCube("cubeMesh" + bullet_counter);
      let componentMesh: ƒ.ComponentMesh = new ƒ.ComponentMesh(bulletMesh);
      let material: ƒ.Material = new ƒ.Material("cubeShader" + bullet_counter, ƒ.ShaderLitTextured);
      let bulletCoat: ƒ.CoatTextured = new ƒ.CoatTextured(undefined, bulletImage);
      material.coat = bulletCoat;
      let materialComp: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(material);
      nodeCube.addComponent(materialComp);
      let cmpMat: ƒ.ComponentMaterial = nodeCube.getComponent(ƒ.ComponentMaterial);
      cmpMat.material = material;
      new ƒ.CoatTextured();
      nodeCube.addComponent(componentMesh);
      nodeCube.addComponent(materialComp);
      nodeCube.addComponent(new ƒ.ComponentTransform());

      viewport.getBranch().addChild(nodeCube);
      currentBullets.push(nodeCube)
      currentBullets[bullet_counter].cmpTransform.mtxLocal = transformcharacter.mtxLocal.clone;
      playerBulletDirection[bullet_counter] = transformcharacter.mtxLocal.getTranslationTo(target.mtxLocal);
      bullet_counter++
      cmpAudio.play(false);
      cmpAudio.setAudio(audioShoot);
      cmpAudio.volume = 1;
      cmpAudio.play(true);
      shootingTimeOut = true;
      if (!closestEnemy) {
        return;
      }

      setTimeout(() => {
        shootingTimeOut = false;
        //characterNode.changeAnim("shoot");
      }, attackspeed);
    }
    else return;
  }
  function checkCollision(): void {
    let pos: ƒ.Vector3 = transformcharacter.mtxLocal.translation;
    for (let i = 0; i < obstaclePositions[0].nChildren; i++) {
      let posBlock: ƒ.Vector3 = obstaclePositions[0].getChild(i).cmpTransform.mtxLocal.translation;
      if (Math.abs(pos.z - posBlock.z) < 0.99 && Math.abs(pos.x - posBlock.x) < 0.99) {
        transformcharacter.mtxLocal.translation = lastPosition.mtxLocal.translation.clone;
      }
    }
  }
  function checkEnemyCollision(): void {
    if (!enemyArray) {
      return;
    }
    let pos: ƒ.Vector3 = enemyArray[0].cmpTransform.mtxLocal.translation;
    for (let i = 0; i < obstaclePositions[0].nChildren; i++) {
      let posBlock: ƒ.Vector3 = obstaclePositions[0].getChild(i).cmpTransform.mtxLocal.translation;
      if (Math.abs(pos.z - posBlock.z) < 0.99 && Math.abs(pos.x - posBlock.x) < 0.99) {
        enemyArray[0].cmpTransform.mtxLocal.translation = lastEnemyPosition.mtxLocal.translation.clone;
      }
    }
  }
  function checkBulletObsCollision(_bulletArray: ƒ.Node[], isEnemyBullet: boolean): void {
    for (let i = 0; i < _bulletArray.length; i++) {
      let posBullet: ƒ.Vector3 = _bulletArray[i].cmpTransform.mtxLocal.translation;
      for (let j = 0; j < 3; j++) {
        let posObs: ƒ.Vector3 = obstaclePositions[0].getChild(j).cmpTransform.mtxLocal.translation;
        if (Math.abs(posBullet.z - posObs.z) < 0.99 && Math.abs(posBullet.x - posObs.x) < 0.99) {
          if (isEnemyBullet) {
            viewport.getBranch().removeChild(currentEnemyBullets[i]);
            currentEnemyBullets.slice(i);
            enemy_bullet_direction.slice(i);
          }
          else {
            viewport.getBranch().removeChild(currentBullets[i]);
            currentBullets.slice(i);
          }
        }

      }
    }
  }
  function checkBulletCharCollision(_bulletArray: ƒ.Node[]): void {
    for (let i = 0; i < _bulletArray.length; i++) {
      let posBullet: ƒ.Vector3 = _bulletArray[i].cmpTransform.mtxLocal.translation;
      if (Math.abs(posBullet.z - transformcharacter.mtxLocal.translation.z) < 0.99 && Math.abs(posBullet.x - transformcharacter.mtxLocal.translation.x) < 0.99) {
        viewport.getBranch().removeChild(currentEnemyBullets[i]);
        playerTakesDamage();
        currentEnemyBullets.slice(i);
      }
    }
  }
  function checkBulletEnemyCollision(): void {
    for (let i = 0; i < currentBullets.length; i++) {
      let posBullet: ƒ.Vector3 = currentBullets[i].cmpTransform.mtxLocal.translation;
      if (Math.abs(posBullet.z - closestEnemy.cmpTransform.mtxLocal.translation.z) < 0.99 && Math.abs(posBullet.x - closestEnemy.cmpTransform.mtxLocal.translation.x) < 0.99) {
        viewport.getBranch().removeChild(currentEnemyBullets[i])
        enemyTakesDamage();
        viewport.getBranch().removeChild(currentBullets[i]);
        currentBullets.slice(i);
      }
    }
  }
  function playerTakesDamage(): void {
    if (!playerImmune) {
      gameState.liveAmount = gameState.liveAmount - 10;
      playerImmune = true;
      setTimeout(() => {
        playerImmune = false;
      }, immunityTime);
    }
    else {
      console.log("player was Immune");
    }
  }
  function enemyTakesDamage(): void {
    if (!enemyImmune) {
      enemyArray[closestEnemyNumber].enemyLiveAmount = enemyArray[closestEnemyNumber].enemyLiveAmount - 10;
      enemyImmune = true;
      setTimeout(() => {
        enemyImmune = false;
      }, immunityTime);
    }
    else {
      console.log("enemy was Immune");
    }
    if (closestEnemy.enemyLiveAmount < 10) {
      console.log(viewport.getBranch());
      viewport.getBranch().removeChild(enemyArray[closestEnemyNumber]);
      console.log(viewport.getBranch());
      enemyArray = enemyArray.slice(closestEnemyNumber);
    }
  }
  function getClosestEnemy(): void {
    let distance: ƒ.Vector3 = new ƒ.Vector3(0, 0, 0);
    let shortestDistance: ƒ.Vector3 = new ƒ.Vector3(100, 100, 100);
    let enemyPos: ƒ.ComponentTransform = new ƒ.ComponentTransform();


    for (let i = 0; i < enemyArray.length; i++) {
      enemyPos.mtxLocal = enemyArray[i].cmpTransform.mtxLocal.clone;
      enemyPos.mtxLocal.scale(new ƒ.Vector3(0.5, 0.5, 0.5))
      enemyPos.mtxLocal.rotation = new ƒ.Vector3(0, 0, 0);
      distance = enemyPos.mtxLocal.getTranslationTo(character.mtxLocal);
      if (distance.magnitude < shortestDistance.magnitude) {
        shortestDistance = distance;
        closestEnemy = enemyArray[i];
        closestEnemyNumber = i;

      }
    }
  }
}

