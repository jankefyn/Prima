namespace Script {
  import ƒ = FudgeCore;
  import ƒAid = FudgeAid;
  ƒ.Debug.info("Main Program Template running!");

  let viewport: ƒ.Viewport;
  let marioSpriteNode: ƒAid.NodeSprite;

  document.addEventListener("interactiveViewportStarted", <EventListener>start);
 
  let marioNode: ƒ.Node;
  function start(_event: CustomEvent): void {
    viewport = _event.detail;

    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    ƒ.Loop.start();  // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
    console.log(viewport);
    let branch: ƒ.Node = viewport.getBranch();
    console.log(branch);
    marioNode = branch.getChildrenByName("MarioTransform")[0];

   
    console.log("Mario:",marioNode);

    hndLoad(_event);
  }

 

  async function hndLoad(_event: Event): Promise<void> {

    let imgSpriteSheet: ƒ.TextureImage = new ƒ.TextureImage();
    await imgSpriteSheet.load("./Texturen/mariowalkx16.gif");
    let coat: ƒ.CoatTextured = new ƒ.CoatTextured(undefined, imgSpriteSheet);

    let animation: ƒAid.SpriteSheetAnimation = new ƒAid.SpriteSheetAnimation("walk", coat);
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
let facingRight: boolean;
facingRight=true;
  function update(_event: Event): void {
    // ƒ.Physics.simulate();

    if(ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.D])){
      marioNode.getComponent(ƒ.ComponentTransform).mtxLocal.translateX(0.01);
      
      if(facingRight==false){
        marioSpriteNode.getComponent(ƒ.ComponentTransform).mtxLocal.rotateY(180);
        facingRight=true;
      }
    }
    else if(ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.A])){
      marioNode.getComponent(ƒ.ComponentTransform).mtxLocal.translateX(-0.01);
      if(facingRight==true){
        marioSpriteNode.getComponent(ƒ.ComponentTransform).mtxLocal.rotateY(180);
        facingRight=false;
      }
      
    }
     else{
     marioSpriteNode.showFrame(2);
     }
    ƒ.AudioManager.default.update();
    viewport.draw();

  }
}