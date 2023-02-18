"use strict";
var Archero;
(function (Archero) {
    var ƒAid = FudgeAid;
    var ƒ = FudgeCore;
    class CharacterNode extends ƒAid.NodeSprite {
        walkAnim;
        shootAnim;
        constructor() {
            super("CharacterNode");
            let cmpTransform = new ƒ.ComponentTransform();
            this.addComponent(cmpTransform);
            let material = new ƒ.Material("charMat", ƒ.ShaderLitTextured);
            let characterCoat = new ƒ.CoatTextured(undefined, Archero.characterImage);
            let reloadCoat = new ƒ.CoatTextured(undefined, Archero.reloadImage);
            this.mtxLocal.rotation = new ƒ.Vector3(90, 90, 0);
            //material.coat = characterCoat;
            this.walkAnim = new ƒAid.SpriteSheetAnimation("walk", characterCoat);
            this.walkAnim.generateByGrid(ƒ.Rectangle.GET(0, 0, 547, 683), 5, 400, ƒ.ORIGIN2D.CENTER, ƒ.Vector2.X(547));
            this.shootAnim = new ƒAid.SpriteSheetAnimation("shoot", reloadCoat);
            this.shootAnim.generateByGrid(ƒ.Rectangle.GET(0, 0, 144.33, 144), 12, 80, ƒ.ORIGIN2D.CENTER, ƒ.Vector2.X(144.33));
            //547 =breite durch anzahl frames, 683= höhe des bildes , 5 anzahl der Frames, 6 ist scale , 547 wie weit nach rechts 
            this.setAnimation(this.shootAnim);
            this.framerate = 5;
            this.setFrameDirection(1);
            let cmpMat = this.getComponent(ƒ.ComponentMaterial);
            cmpMat.material = material;
            new ƒ.CoatTextured();
        }
        changeAnim(_type) {
            if (_type == "walk") {
                console.log("hallo");
                this.setAnimation(this.walkAnim);
                this.framerate = 5;
                this.setFrameDirection(1);
            }
            else if (_type == "shoot") {
                this.setAnimation(this.shootAnim);
                this.framerate = 5;
                this.setFrameDirection(1);
            }
        }
    }
    Archero.CharacterNode = CharacterNode;
})(Archero || (Archero = {}));
var Archero;
(function (Archero) {
    var ƒ = FudgeCore;
    ƒ.Project.registerScriptNamespace(Archero); // Register the namespace to FUDGE for serialization
    class CharacterScript extends ƒ.ComponentScript {
        // Register the script as component for use in the editor via drag&drop
        static iSubclass = ƒ.Component.registerSubclass(CharacterScript);
        characterIsMoving = false;
        constructor() {
            super();
            // Don't start when running in editor
            if (ƒ.Project.mode == ƒ.MODE.EDITOR)
                return;
            // Listen to this component being added to or removed from a node
            this.addEventListener("componentAdd" /* COMPONENT_ADD */, this.hndEvent);
            this.addEventListener("componentRemove" /* COMPONENT_REMOVE */, this.hndEvent);
            this.addEventListener("nodeDeserialized" /* NODE_DESERIALIZED */, this.hndEvent);
        }
        // Activate the functions of this component as response to events
        hndEvent = (_event) => {
            switch (_event.type) {
                case "componentAdd" /* COMPONENT_ADD */:
                    ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.update);
                    break;
                case "componentRemove" /* COMPONENT_REMOVE */:
                    this.removeEventListener("componentAdd" /* COMPONENT_ADD */, this.hndEvent);
                    this.removeEventListener("componentRemove" /* COMPONENT_REMOVE */, this.hndEvent);
                    break;
                case "nodeDeserialized" /* NODE_DESERIALIZED */:
                    break;
            }
        };
        walkLeft() {
            Archero.lastPosition.mtxLocal = Archero.transformcharacter.mtxLocal.clone;
            Archero.transformcharacter.mtxLocal.translateZ(-(Archero.characterSpeed * ƒ.Loop.timeFrameGame / 1000));
            this.characterIsMoving = true;
        }
        walkRight() {
            Archero.lastPosition.mtxLocal = Archero.transformcharacter.mtxLocal.clone;
            Archero.transformcharacter.mtxLocal.translateZ((Archero.characterSpeed * ƒ.Loop.timeFrameGame / 1000));
            this.characterIsMoving = true;
        }
        walkForward() {
            Archero.lastPosition.mtxLocal = Archero.transformcharacter.mtxLocal.clone;
            Archero.transformcharacter.mtxLocal.translateX(Archero.characterSpeed * ƒ.Loop.timeFrameGame / 1000);
            this.characterIsMoving = true;
        }
        walkBackwards() {
            Archero.lastPosition.mtxLocal = Archero.transformcharacter.mtxLocal.clone;
            Archero.transformcharacter.mtxLocal.translateX(-(Archero.characterSpeed * ƒ.Loop.timeFrameGame / 1000));
            this.characterIsMoving = true;
        }
        walkLeftForward() {
            Archero.lastPosition.mtxLocal = Archero.transformcharacter.mtxLocal.clone;
            Archero.transformcharacter.mtxLocal.translateZ(-((Archero.characterSpeed * ƒ.Loop.timeFrameGame / 1000) / 2));
            Archero.transformcharacter.mtxLocal.translateX(((Archero.characterSpeed * ƒ.Loop.timeFrameGame / 1000) / 2));
            this.characterIsMoving = true;
        }
        walkRightForward() {
            Archero.lastPosition.mtxLocal = Archero.transformcharacter.mtxLocal.clone;
            Archero.transformcharacter.mtxLocal.translateZ(((Archero.characterSpeed * ƒ.Loop.timeFrameGame / 1000) / 2));
            Archero.transformcharacter.mtxLocal.translateX(((Archero.characterSpeed * ƒ.Loop.timeFrameGame / 1000) / 2));
            this.characterIsMoving = true;
        }
        walkLeftBackwards() {
            Archero.lastPosition.mtxLocal = Archero.transformcharacter.mtxLocal.clone;
            Archero.transformcharacter.mtxLocal.translateZ(-((Archero.characterSpeed * ƒ.Loop.timeFrameGame / 1000) / 2));
            Archero.transformcharacter.mtxLocal.translateX(-((Archero.characterSpeed * ƒ.Loop.timeFrameGame / 1000) / 2));
            this.characterIsMoving = true;
        }
        walkRightBackwards() {
            Archero.lastPosition.mtxLocal = Archero.transformcharacter.mtxLocal.clone;
            Archero.transformcharacter.mtxLocal.translateZ(((Archero.characterSpeed * ƒ.Loop.timeFrameGame / 1000) / 2));
            Archero.transformcharacter.mtxLocal.translateX(-((Archero.characterSpeed * ƒ.Loop.timeFrameGame / 1000) / 2));
            this.characterIsMoving = true;
        }
        update = (_event) => {
            if (!this.characterIsMoving && Archero.closestEnemy != undefined) {
                this.node.dispatchEvent(new Event("charShoots", { bubbles: true }));
            }
        };
    }
    Archero.CharacterScript = CharacterScript;
})(Archero || (Archero = {}));
var Archero;
(function (Archero) {
    var ƒAid = FudgeAid;
    var ƒ = FudgeCore;
    class EnemyNode extends ƒAid.NodeSprite {
        enemyLiveAmount = 50;
        constructor(_name, pos) {
            super("EnemyNode");
            this.name = _name;
            let enemyTransform = new ƒ.ComponentTransform();
            let Material = new ƒ.Material("enemyMat", ƒ.ShaderLitTextured);
            let enemyCoat = new ƒ.CoatTextured(undefined, Archero.EnemyImage);
            Material.coat = enemyCoat;
            enemyTransform.mtxLocal.translation = pos;
            enemyTransform.mtxLocal.rotation = new ƒ.Vector3(90, 90, 0);
            enemyTransform.mtxLocal.scale(new ƒ.Vector3(2, 2, 2));
            this.addComponent(enemyTransform);
            let cmpMat = this.getComponent(ƒ.ComponentMaterial);
            cmpMat.material = Material;
            new ƒ.CoatTextured();
        }
    }
    Archero.EnemyNode = EnemyNode;
})(Archero || (Archero = {}));
var Archero;
(function (Archero) {
    var ƒ = FudgeCore;
    var ƒui = FudgeUserInterface;
    class GameState extends ƒ.Mutable {
        reduceMutator(_mutator) { }
        liveAmount = 100;
        text = "";
        controller;
        constructor() {
            super();
            this.controller = new ƒui.Controller(this, document.querySelector("#vui"));
            console.log(this.controller);
        }
    }
    Archero.GameState = GameState;
})(Archero || (Archero = {}));
var Archero;
(function (Archero) {
    var ƒ = FudgeCore;
    ƒ.Debug.info("Main Program Template running!");
    let obstaclePositions;
    let bullet_counter = 0;
    let bulletspeed = 8;
    let enemyBulletSpeed = 5;
    let currentBullets = [];
    let audioShoot = new ƒ.Audio("Script/Source/sounds/Bow_Shot_01.wav");
    let audioMove = new ƒ.Audio("Script/Source/sounds/Small_Run_Sequence_02.wav");
    let cmpAudio;
    let attackspeed = 1000;
    let alreadyChecked = false;
    let playerScript;
    let playerImmune = false;
    let enemyImmune = false;
    let immunityTime = 500;
    let bulletImage = new ƒ.TextureImage();
    let amountEnemys = 1;
    let playerBulletDirection = [];
    let characterNode;
    /* let enemyAngleRad: number;
     let enemyAngleDeg: number;
     let playerAngleRad: number;
     let playerAngleDeg: number;
     let turnAngle: number;
     */
    let target;
    Archero.enemyBulletImage = new ƒ.TextureImage();
    Archero.shootingTimeOut = false;
    Archero.closestEnemyNumber = 0;
    Archero.enemyArray = [];
    Archero.characterSpeed = 3;
    Archero.enemySpeed = 4;
    Archero.lastPosition = new ƒ.ComponentTransform();
    Archero.lastEnemyPosition = new ƒ.ComponentTransform();
    Archero.characterImage = new ƒ.TextureImage();
    Archero.reloadImage = new ƒ.TextureImage();
    Archero.EnemyImage = new ƒ.TextureImage();
    Archero.enemyAttackspeed = 1000;
    Archero.transformcharacter = new ƒ.ComponentTransform();
    Archero.enemy_bullet_counter = 0;
    Archero.enemy_bullet_direction = [];
    Archero.currentEnemyBullets = [];
    function fromJSON(_json) {
        attackspeed = _json.attackspeed;
        bulletspeed = _json.bulletspeed;
        Archero.enemyAttackspeed = _json.enemyAttackspeed;
        enemyBulletSpeed = _json.enemyBulletspeed;
    }
    async function loadJson(_path) {
        let response = await fetch(_path);
        let json = await response.json();
        return json;
    }
    document.addEventListener("interactiveViewportStarted", start);
    async function start(_event) {
        Archero.viewport = _event.detail;
        Archero.viewport.camera.mtxPivot.translation = new ƒ.Vector3(6, 25, 6);
        Archero.viewport.camera.mtxPivot.rotateY(90);
        Archero.viewport.camera.mtxPivot.rotateX(90);
        ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        let branch = Archero.viewport.getBranch();
        branch.addEventListener("charShoots", shoot);
        await Archero.EnemyImage.load("Script/Source/Images/fire_Monster.png");
        await Archero.characterImage.load("Script/Source/Images/shooterGif.png");
        await Archero.reloadImage.load("Script/Source/Images/reload.png");
        await bulletImage.load("Script/Source/Images/shooterGif.png");
        await Archero.enemyBulletImage.load("Script/Source/Images/Feuerball.png");
        Archero.character = branch.getChildrenByName("Character")[0];
        playerScript = new Archero.CharacterScript();
        target = new ƒ.ComponentTransform();
        Archero.character.addComponent(playerScript);
        Archero.character.removeComponent(Archero.character.getComponent(ƒ.ComponentMaterial));
        obstaclePositions = branch.getChildrenByName("Obstacles");
        cmpAudio = new ƒ.ComponentAudio(audioShoot, false, false);
        cmpAudio.connect(true);
        ƒ.Loop.start(ƒ.LOOP_MODE.TIME_GAME, 200);
        let json = await loadJson("Script/Source/data.json");
        fromJSON(json);
        Archero.gameState = new Archero.GameState();
        characterNode = new Archero.CharacterNode();
        Archero.character.addChild(characterNode);
        spawnEnenys();
        getClosestEnemy();
    }
    function update(_event) {
        if (Archero.gameState.liveAmount < 10) {
            console.log("ich bin hier");
            Archero.gameState.liveAmount = 0;
            Archero.gameState.text = "YOU ARE DEAD , RELOAD SITE TO START AGAIN";
            return;
        }
        // ƒ.Physics.simulate();  // if physics is included and used
        Archero.transformcharacter = Archero.character.getComponent(ƒ.ComponentTransform);
        getClosestEnemy();
        if (Archero.closestEnemy != undefined) {
            checkCollision();
            checkEnemyCollision();
            checkBulletEnemyCollision();
            checkBulletObsCollision(currentBullets, false);
            checkBulletObsCollision(Archero.currentEnemyBullets, true);
            checkBulletCharCollision(Archero.currentEnemyBullets);
            focusTarget();
            Archero.viewport.draw();
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
            for (let i = 0; i < currentBullets.length; i++) {
                playerBulletDirection[i].normalize();
                playerBulletDirection[i] = ƒ.Vector3.SCALE(playerBulletDirection[i], ƒ.Loop.timeFrameGame / 1000);
                playerBulletDirection[i].scale(bulletspeed);
                if (playerBulletDirection[i].magnitude > 0) {
                    currentBullets[i].cmpTransform.mtxLocal.translateX(((bulletspeed * ƒ.Loop.timeFrameGame / 1000) / 2));
                }
                currentBullets[i].cmpTransform.mtxLocal.translate(playerBulletDirection[i]);
                //currentBullets[i].cmpTransform.mtxLocal.translateX(bulletspeed * ƒ.Loop.timeFrameGame / 1000);
            }
            for (let i = 0; i < Archero.currentEnemyBullets.length; i++) {
                Archero.enemy_bullet_direction[i].normalize();
                Archero.enemy_bullet_direction[i] = ƒ.Vector3.SCALE(Archero.enemy_bullet_direction[i], ƒ.Loop.timeFrameGame / 1000);
                Archero.enemy_bullet_direction[i].scale(enemyBulletSpeed);
                Archero.currentEnemyBullets[i].cmpTransform.mtxLocal.translate(Archero.enemy_bullet_direction[i]);
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
    function spawnEnenys() {
        for (let i = 0; i < amountEnemys; i++) {
            let enemyNode = new Archero.EnemyNode("enemy" + i, new ƒ.Vector3(Math.floor(Math.random() * (12 - 10 + 1) + 10), 0, Math.floor(Math.random() * (15 + 1))));
            enemyNode.addComponent(new Archero.StateMachine());
            Archero.viewport.getBranch().addChild(enemyNode);
            Archero.enemyArray.push(enemyNode);
        }
    }
    function focusTarget() {
        target.mtxLocal = Archero.closestEnemy.cmpTransform.mtxLocal.clone;
        target.mtxLocal.scale(new ƒ.Vector3(0.5, 0.5, 0.5));
        target.mtxLocal.rotation = new ƒ.Vector3(0, 0, 0);
    }
    function shoot() {
        if (!Archero.shootingTimeOut) {
            characterNode.changeAnim("shoot");
            let nodeCube = new ƒ.Node("cube" + bullet_counter);
            let bulletMesh = new ƒ.MeshCube("cubeMesh" + bullet_counter);
            let componentMesh = new ƒ.ComponentMesh(bulletMesh);
            let material = new ƒ.Material("cubeShader" + bullet_counter, ƒ.ShaderLitTextured);
            let bulletCoat = new ƒ.CoatTextured(undefined, bulletImage);
            material.coat = bulletCoat;
            let materialComp = new ƒ.ComponentMaterial(material);
            nodeCube.addComponent(materialComp);
            let cmpMat = nodeCube.getComponent(ƒ.ComponentMaterial);
            cmpMat.material = material;
            new ƒ.CoatTextured();
            nodeCube.addComponent(componentMesh);
            nodeCube.addComponent(materialComp);
            nodeCube.addComponent(new ƒ.ComponentTransform());
            Archero.viewport.getBranch().addChild(nodeCube);
            currentBullets.push(nodeCube);
            currentBullets[bullet_counter].cmpTransform.mtxLocal = Archero.transformcharacter.mtxLocal.clone;
            playerBulletDirection[bullet_counter] = Archero.transformcharacter.mtxLocal.getTranslationTo(target.mtxLocal);
            bullet_counter++;
            cmpAudio.play(false);
            cmpAudio.setAudio(audioShoot);
            cmpAudio.volume = 1;
            cmpAudio.play(true);
            Archero.shootingTimeOut = true;
            if (!Archero.closestEnemy) {
                return;
            }
            setTimeout(() => {
                Archero.shootingTimeOut = false;
                //characterNode.changeAnim("shoot");
            }, attackspeed);
        }
        else
            return;
    }
    function checkCollision() {
        let pos = Archero.transformcharacter.mtxLocal.translation;
        for (let i = 0; i < obstaclePositions[0].nChildren; i++) {
            let posBlock = obstaclePositions[0].getChild(i).cmpTransform.mtxLocal.translation;
            if (Math.abs(pos.z - posBlock.z) < 0.99 && Math.abs(pos.x - posBlock.x) < 0.99) {
                Archero.transformcharacter.mtxLocal.translation = Archero.lastPosition.mtxLocal.translation.clone;
            }
        }
    }
    function checkEnemyCollision() {
        if (!Archero.enemyArray) {
            return;
        }
        let pos = Archero.enemyArray[0].cmpTransform.mtxLocal.translation;
        for (let i = 0; i < obstaclePositions[0].nChildren; i++) {
            let posBlock = obstaclePositions[0].getChild(i).cmpTransform.mtxLocal.translation;
            if (Math.abs(pos.z - posBlock.z) < 0.99 && Math.abs(pos.x - posBlock.x) < 0.99) {
                Archero.enemyArray[0].cmpTransform.mtxLocal.translation = Archero.lastEnemyPosition.mtxLocal.translation.clone;
            }
        }
    }
    function checkBulletObsCollision(_bulletArray, isEnemyBullet) {
        for (let i = 0; i < _bulletArray.length; i++) {
            let posBullet = _bulletArray[i].cmpTransform.mtxLocal.translation;
            for (let j = 0; j < 3; j++) {
                let posObs = obstaclePositions[0].getChild(j).cmpTransform.mtxLocal.translation;
                if (Math.abs(posBullet.z - posObs.z) < 0.99 && Math.abs(posBullet.x - posObs.x) < 0.99) {
                    if (isEnemyBullet) {
                        Archero.viewport.getBranch().removeChild(Archero.currentEnemyBullets[i]);
                        Archero.currentEnemyBullets.slice(i);
                        Archero.enemy_bullet_direction.slice(i);
                    }
                    else {
                        Archero.viewport.getBranch().removeChild(currentBullets[i]);
                        currentBullets.slice(i);
                    }
                }
            }
        }
    }
    function checkBulletCharCollision(_bulletArray) {
        for (let i = 0; i < _bulletArray.length; i++) {
            let posBullet = _bulletArray[i].cmpTransform.mtxLocal.translation;
            if (Math.abs(posBullet.z - Archero.transformcharacter.mtxLocal.translation.z) < 0.99 && Math.abs(posBullet.x - Archero.transformcharacter.mtxLocal.translation.x) < 0.99) {
                Archero.viewport.getBranch().removeChild(Archero.currentEnemyBullets[i]);
                playerTakesDamage();
                Archero.currentEnemyBullets.slice(i);
            }
        }
    }
    function checkBulletEnemyCollision() {
        for (let i = 0; i < currentBullets.length; i++) {
            let posBullet = currentBullets[i].cmpTransform.mtxLocal.translation;
            if (Math.abs(posBullet.z - Archero.closestEnemy.cmpTransform.mtxLocal.translation.z) < 0.99 && Math.abs(posBullet.x - Archero.closestEnemy.cmpTransform.mtxLocal.translation.x) < 0.99) {
                Archero.viewport.getBranch().removeChild(Archero.currentEnemyBullets[i]);
                enemyTakesDamage();
                Archero.viewport.getBranch().removeChild(currentBullets[i]);
                currentBullets.slice(i);
            }
        }
    }
    function playerTakesDamage() {
        if (!playerImmune) {
            Archero.gameState.liveAmount = Archero.gameState.liveAmount - 10;
            playerImmune = true;
            setTimeout(() => {
                playerImmune = false;
            }, immunityTime);
        }
        else {
            console.log("player was Immune");
        }
    }
    function enemyTakesDamage() {
        if (!enemyImmune) {
            Archero.enemyArray[Archero.closestEnemyNumber].enemyLiveAmount = Archero.enemyArray[Archero.closestEnemyNumber].enemyLiveAmount - 10;
            enemyImmune = true;
            setTimeout(() => {
                enemyImmune = false;
            }, immunityTime);
        }
        else {
            console.log("enemy was Immune");
        }
        if (Archero.closestEnemy.enemyLiveAmount < 10) {
            console.log(Archero.viewport.getBranch());
            Archero.viewport.getBranch().removeChild(Archero.enemyArray[Archero.closestEnemyNumber]);
            console.log(Archero.viewport.getBranch());
            Archero.enemyArray = Archero.enemyArray.slice(Archero.closestEnemyNumber);
        }
    }
    function getClosestEnemy() {
        let distance = new ƒ.Vector3(0, 0, 0);
        let shortestDistance = new ƒ.Vector3(100, 100, 100);
        let enemyPos = new ƒ.ComponentTransform();
        for (let i = 0; i < Archero.enemyArray.length; i++) {
            enemyPos.mtxLocal = Archero.enemyArray[i].cmpTransform.mtxLocal.clone;
            enemyPos.mtxLocal.scale(new ƒ.Vector3(0.5, 0.5, 0.5));
            enemyPos.mtxLocal.rotation = new ƒ.Vector3(0, 0, 0);
            distance = enemyPos.mtxLocal.getTranslationTo(Archero.character.mtxLocal);
            if (distance.magnitude < shortestDistance.magnitude) {
                shortestDistance = distance;
                Archero.closestEnemy = Archero.enemyArray[i];
                Archero.closestEnemyNumber = i;
            }
        }
    }
})(Archero || (Archero = {}));
var Archero;
(function (Archero) {
    var ƒ = FudgeCore;
    var ƒAid = FudgeAid;
    let STATE;
    (function (STATE) {
        STATE[STATE["IDLE"] = 0] = "IDLE";
        STATE[STATE["HUNT"] = 1] = "HUNT";
        STATE[STATE["SHOOT"] = 2] = "SHOOT";
        STATE[STATE["DEAD"] = 3] = "DEAD";
        STATE[STATE["CHECK"] = 4] = "CHECK";
    })(STATE || (STATE = {}));
    class StateMachine extends ƒAid.ComponentStateMachine {
        static iSubclass = ƒ.Component.registerSubclass(StateMachine);
        static instructions = StateMachine.get();
        static enemyShootingTimeout;
        constructor() {
            super();
            this.instructions = StateMachine.instructions; // setup instructions with the static set
            StateMachine.enemyShootingTimeout = false;
            // Don't start when running in editor
            if (ƒ.Project.mode == ƒ.MODE.EDITOR)
                return;
            // Listen to this component being added to or removed from a node
            this.addEventListener("componentAdd" /* COMPONENT_ADD */, this.hndEvent);
            this.addEventListener("componentRemove" /* COMPONENT_REMOVE */, this.hndEvent);
            this.addEventListener("nodeDeserialized" /* NODE_DESERIALIZED */, this.hndEvent);
        }
        static get() {
            let setup = new ƒAid.StateMachineInstructions();
            setup.transitDefault = StateMachine.transitDefault;
            setup.actDefault = StateMachine.actDefault;
            setup.setAction(STATE.IDLE, this.actIdle);
            setup.setAction(STATE.HUNT, this.actHunt);
            setup.setAction(STATE.SHOOT, this.actShoot);
            setup.setAction(STATE.DEAD, this.actDead);
            setup.setAction(STATE.CHECK, this.actCheck);
            return setup;
        }
        static transitDefault(_machine) {
            //console.log("Transit to", _machine.stateNext);
        }
        static async actDefault(_machine) {
            //console.log(STATE[_machine.stateCurrent]);
        }
        static async actIdle(_machine) {
            let distance = ƒ.Vector3.DIFFERENCE(Archero.character.mtxWorld.translation, _machine.node.mtxWorld.translation);
            if (distance.magnitude < 10) {
                _machine.transit(STATE.HUNT);
            }
        }
        static async actHunt(_machine) {
            let distance = ƒ.Vector3.DIFFERENCE(Archero.character.mtxWorld.translation, _machine.node.mtxWorld.translation);
            let direction = new ƒ.Vector3;
            Archero.lastEnemyPosition.mtxLocal = _machine.node.cmpTransform.mtxLocal.clone;
            _machine.node.cmpTransform.mtxLocal.scale(new ƒ.Vector3(0.5, 0.5, 0.5));
            _machine.node.cmpTransform.mtxLocal.rotation = new ƒ.Vector3(0, 0, 0);
            direction = _machine.node.cmpTransform.mtxLocal.getTranslationTo(Archero.transformcharacter.mtxLocal);
            direction.normalize();
            direction = ƒ.Vector3.SCALE(direction, ƒ.Loop.timeFrameGame / 1000);
            //direction.scale(enemySpeed);
            _machine.node.cmpTransform.mtxLocal.translate(direction);
            _machine.node.cmpTransform.mtxLocal.scale(new ƒ.Vector3(2, 2, 2));
            _machine.node.cmpTransform.mtxLocal.rotation = new ƒ.Vector3(90, 90, 0);
            if (distance.magnitude > 10) {
                _machine.transit(STATE.IDLE);
            }
            else if (distance.magnitude < 5 && !this.enemyShootingTimeout) {
                _machine.transit(STATE.SHOOT);
            }
        }
        static async actShoot(_machine) {
            if (this.enemyShootingTimeout) {
                _machine.transit(STATE.HUNT);
                return;
            }
            let enemyCube = new ƒ.Node("enemyCube" + Archero.enemy_bullet_counter);
            let enemyBulletMesh = new ƒ.MeshCube("enemyCubeMesh" + Archero.enemy_bullet_counter);
            let componentMesh = new ƒ.ComponentMesh(enemyBulletMesh);
            let material = new ƒ.Material("enemyCubeShader" + Archero.enemy_bullet_counter, ƒ.ShaderLitTextured);
            let enemyBulletCoat = new ƒ.CoatTextured(undefined, Archero.enemyBulletImage);
            material.coat = enemyBulletCoat;
            let materialComp = new ƒ.ComponentMaterial(material);
            enemyCube.addComponent(materialComp);
            let cmpMat = enemyCube.getComponent(ƒ.ComponentMaterial);
            cmpMat.material = material;
            new ƒ.CoatTextured();
            enemyCube.addComponent(componentMesh);
            enemyCube.addComponent(materialComp);
            enemyCube.addComponent(new ƒ.ComponentTransform());
            enemyCube.cmpTransform.mtxLocal.scale(new ƒ.Vector3(3, 3, 3));
            Archero.viewport.getBranch().addChild(enemyCube);
            Archero.currentEnemyBullets.push(Archero.viewport.getBranch().getChildrenByName("enemyCube" + Archero.enemy_bullet_counter)[0]);
            Archero.currentEnemyBullets[Archero.enemy_bullet_counter].cmpTransform.mtxLocal = _machine.node.mtxLocal.clone;
            Archero.currentEnemyBullets[Archero.enemy_bullet_counter].cmpTransform.mtxLocal.scale(new ƒ.Vector3(0.5, 0.5, 0.5));
            Archero.currentEnemyBullets[Archero.enemy_bullet_counter].cmpTransform.mtxLocal.rotation = new ƒ.Vector3(0, 0, 0);
            Archero.enemy_bullet_direction[Archero.enemy_bullet_counter] = Archero.currentEnemyBullets[Archero.enemy_bullet_counter].cmpTransform.mtxLocal.getTranslationTo(Archero.transformcharacter.mtxLocal);
            Archero.enemy_bullet_counter++;
            this.enemyShootingTimeout = true;
            setTimeout(() => {
                this.enemyShootingTimeout = false;
            }, Archero.enemyAttackspeed);
        }
        static async actDead(_machine) {
            console.log("i am Dead");
        }
        static async actCheck(_machine) {
            if (Archero.closestEnemy == _machine.node) {
                _machine.transit(STATE.DEAD);
            }
            else
                (_machine.transit(STATE.IDLE));
        }
        // Activate the functions of this component as response to events
        hndEvent = (_event) => {
            switch (_event.type) {
                case "componentAdd" /* COMPONENT_ADD */:
                    ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.update);
                    this.transit(STATE.IDLE);
                    break;
                case "componentRemove" /* COMPONENT_REMOVE */:
                    this.removeEventListener("componentAdd" /* COMPONENT_ADD */, this.hndEvent);
                    this.removeEventListener("componentRemove" /* COMPONENT_REMOVE */, this.hndEvent);
                    ƒ.Loop.removeEventListener("loopFrame" /* LOOP_FRAME */, this.update);
                    break;
                case "nodeDeserialized" /* NODE_DESERIALIZED */:
                    this.transit(STATE.IDLE);
                    break;
            }
        };
        update = (_event) => {
            this.act();
            if (Archero.closestEnemy.enemyLiveAmount < 10) {
                this.transit(STATE.CHECK);
            }
        };
    }
    Archero.StateMachine = StateMachine;
})(Archero || (Archero = {}));
//# sourceMappingURL=Script.js.map