"use strict";
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    ƒ.Project.registerScriptNamespace(Script); // Register the namespace to FUDGE for serialization
    class CustomComponentScript extends ƒ.ComponentScript {
        // Register the script as component for use in the editor via drag&drop
        static iSubclass = ƒ.Component.registerSubclass(CustomComponentScript);
        // Properties may be mutated by users in the editor via the automatically created user interface
        message = "CustomComponentScript added to ";
        constructor() {
            super();
            // Don't start when running in editor
            if (ƒ.Project.mode == ƒ.MODE.EDITOR)
                return;
            // Listen to this component being added to or removed from a node
            this.addEventListener("componentAdd" /* ƒ.EVENT.COMPONENT_ADD */, this.hndEvent);
            this.addEventListener("componentRemove" /* ƒ.EVENT.COMPONENT_REMOVE */, this.hndEvent);
            this.addEventListener("nodeDeserialized" /* ƒ.EVENT.NODE_DESERIALIZED */, this.hndEvent);
        }
        // Activate the functions of this component as response to events
        hndEvent = (_event) => {
            switch (_event.type) {
                case "componentAdd" /* ƒ.EVENT.COMPONENT_ADD */:
                    ƒ.Debug.log(this.message, this.node);
                    break;
                case "componentRemove" /* ƒ.EVENT.COMPONENT_REMOVE */:
                    this.removeEventListener("componentAdd" /* ƒ.EVENT.COMPONENT_ADD */, this.hndEvent);
                    this.removeEventListener("componentRemove" /* ƒ.EVENT.COMPONENT_REMOVE */, this.hndEvent);
                    break;
                case "nodeDeserialized" /* ƒ.EVENT.NODE_DESERIALIZED */:
                    // if deserialized the node is now fully reconstructed and access to all its components and children is possible
                    break;
            }
        };
    }
    Script.CustomComponentScript = CustomComponentScript;
})(Script || (Script = {}));
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    var ƒAid = FudgeAid;
    ƒ.Debug.info("Main Program Template running!");
    let viewport;
    let marioSpriteNode;
    let SpeedMario = 3;
    let SpeedSprintMario = SpeedMario + 2.5;
    let facingRight;
    let distanceY = 0;
    let gravitation = 0.001;
    let isJumping = false;
    let alreadyJumped = false;
    document.addEventListener("interactiveViewportStarted", start);
    let marioNode;
    function start(_event) {
        viewport = _event.detail;
        ƒ.Loop.addEventListener("loopFrame" /* ƒ.EVENT.LOOP_FRAME */, update);
        ƒ.Loop.start(); // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
        console.log(viewport);
        let branch = viewport.getBranch();
        marioNode = branch.getChildrenByName("MarioTransform")[0];
        console.log("Mario:", marioNode);
        hndLoad(_event);
    }
    async function hndLoad(_event) {
        let imgSpriteSheet = new ƒ.TextureImage();
        await imgSpriteSheet.load("./Texturen/mariowalkx16.gif");
        let coat = new ƒ.CoatTextured(undefined, imgSpriteSheet);
        let animation = new ƒAid.SpriteSheetAnimation("walk", coat);
        animation.generateByGrid(ƒ.Rectangle.GET(0, 0, 15, 16), 3, 12, ƒ.ORIGIN2D.BOTTOMCENTER, ƒ.Vector2.X(16));
        marioSpriteNode = new ƒAid.NodeSprite("Sprite");
        marioSpriteNode.addComponent(new ƒ.ComponentTransform(new ƒ.Matrix4x4()));
        marioSpriteNode.setAnimation(animation);
        marioSpriteNode.setFrameDirection(1);
        marioSpriteNode.mtxLocal.translateY(0.5);
        marioSpriteNode.framerate = 12;
        marioNode.removeAllChildren();
        marioNode.addChild(marioSpriteNode);
        viewport.draw();
        ƒ.Loop.start(ƒ.LOOP_MODE.TIME_GAME, 30);
    }
    facingRight = true;
    function update(_event) {
        // ƒ.Physics.simulate();
        let pos = marioNode.mtxLocal.translation;
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.SPACE]) && isJumping == false) {
            console.log(alreadyJumped);
            if (alreadyJumped == false) {
                marioNode.mtxLocal.translateY(1);
            }
            alreadyJumped = true;
            isJumping = true;
            distanceY = (distanceY + gravitation) * ƒ.Loop.timeFrameGame / 1000;
        }
        else if (pos.y + distanceY > 1) {
            marioNode.mtxLocal.translateY(-distanceY);
        }
        else {
            distanceY = 0;
            pos.y = 0;
            marioNode.mtxLocal.translation = pos;
            isJumping = false;
        }
        if (!ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.SPACE])) {
            alreadyJumped = false;
        }
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.D])) {
            if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.SHIFT_LEFT])) {
                marioNode.getComponent(ƒ.ComponentTransform).mtxLocal.translateX(ƒ.Loop.timeFrameGame / 1000 * SpeedSprintMario);
            }
            else {
                marioNode.getComponent(ƒ.ComponentTransform).mtxLocal.translateX(ƒ.Loop.timeFrameGame / 1000 * SpeedMario);
            }
            if (facingRight == false) {
                marioSpriteNode.getComponent(ƒ.ComponentTransform).mtxLocal.rotateY(180);
                facingRight = true;
            }
        }
        else if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.A])) {
            if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.SHIFT_LEFT])) {
                marioNode.getComponent(ƒ.ComponentTransform).mtxLocal.translateX(-ƒ.Loop.timeFrameGame / 1000 * SpeedSprintMario);
            }
            else {
                marioNode.getComponent(ƒ.ComponentTransform).mtxLocal.translateX(-ƒ.Loop.timeFrameGame / 1000 * SpeedMario);
            }
            if (facingRight == true) {
                marioSpriteNode.getComponent(ƒ.ComponentTransform).mtxLocal.rotateY(180);
                facingRight = false;
            }
        }
        else {
            marioSpriteNode.showFrame(1);
        }
        ƒ.AudioManager.default.update();
        viewport.draw();
    }
})(Script || (Script = {}));
//# sourceMappingURL=Script.js.map