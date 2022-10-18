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
    document.addEventListener("interactiveViewportStarted", start);
    let marioNode;
    function start(_event) {
        viewport = _event.detail;
        ƒ.Loop.addEventListener("loopFrame" /* ƒ.EVENT.LOOP_FRAME */, update);
        ƒ.Loop.start(); // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
        console.log(viewport);
        let branch = viewport.getBranch();
        console.log(branch);
        marioNode = branch.getChildrenByName("MarioTransform")[0];
        console.log("Mario:", marioNode);
        hndLoad(_event);
    }
    let tempPos = 1;
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
        marioSpriteNode.mtxLocal.translateY(+0.5);
        marioSpriteNode.framerate = 12;
        marioNode.removeAllChildren();
        marioNode.addChild(marioSpriteNode);
        viewport.draw();
        ƒ.Loop.start(ƒ.LOOP_MODE.TIME_GAME, 100);
    }
    let facingRight;
    facingRight = true;
    function update(_event) {
        // ƒ.Physics.simulate();
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.D])) {
            tempPos += 0.1;
            marioNode.getComponent(ƒ.ComponentTransform).mtxLocal.translateX(0.01);
            if (facingRight == false) {
                marioSpriteNode.getComponent(ƒ.ComponentTransform).mtxLocal.rotateY(180);
                facingRight = true;
            }
        }
        else if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.A])) {
            tempPos += 0.1;
            marioNode.getComponent(ƒ.ComponentTransform).mtxLocal.translateX(-0.01);
            if (facingRight == true) {
                marioSpriteNode.getComponent(ƒ.ComponentTransform).mtxLocal.rotateY(180);
                facingRight = false;
            }
        }
        else {
            marioSpriteNode.showFrame(2);
        }
        ƒ.AudioManager.default.update();
        viewport.draw();
    }
})(Script || (Script = {}));
//# sourceMappingURL=Script.js.map