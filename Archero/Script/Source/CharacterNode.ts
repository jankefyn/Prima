namespace Archero {

  import ƒAid = FudgeAid;
  import ƒ = FudgeCore;


  export class CharacterNode extends ƒAid.NodeSprite {
    walkAnim: ƒAid.SpriteSheetAnimation;
    shootAnim: ƒAid.SpriteSheetAnimation;
    constructor() {
      super("CharacterNode");
      let cmpTransform: ƒ.ComponentTransform = new ƒ.ComponentTransform();
      this.addComponent(cmpTransform);
      let material: ƒ.Material = new ƒ.Material("charMat", ƒ.ShaderLitTextured);
      let characterCoat: ƒ.CoatTextured = new ƒ.CoatTextured(undefined, characterImage);
      let reloadCoat: ƒ.CoatTextured = new ƒ.CoatTextured(undefined, reloadImage);
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
      let cmpMat: ƒ.ComponentMaterial = this.getComponent(ƒ.ComponentMaterial);
      cmpMat.material = material;
      new ƒ.CoatTextured();
    }
    public changeAnim(_type: string): void {
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
}