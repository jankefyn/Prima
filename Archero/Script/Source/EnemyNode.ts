namespace Archero {

  import ƒAid = FudgeAid;
  import ƒ = FudgeCore;


  export class EnemyNode extends ƒAid.NodeSprite {
    enemyLiveAmount: number = 50;
    
    constructor(_name:string ,pos:ƒ.Vector3) {
      super("EnemyNode");
      this.name = _name;
      let enemyTransform:ƒ.ComponentTransform = new ƒ.ComponentTransform();
      let Material:  ƒ.Material = new  ƒ.Material("enemyMat",  ƒ.ShaderLitTextured);
      let enemyCoat:  ƒ.CoatTextured = new  ƒ.CoatTextured(undefined, EnemyImage);
      Material.coat = enemyCoat;
      enemyTransform.mtxLocal.translation = pos;
      enemyTransform.mtxLocal.rotation = new ƒ.Vector3(90,90,0);
      enemyTransform.mtxLocal.scale(new ƒ.Vector3(2,2,2));
      
      this.addComponent(enemyTransform)
      
      let cmpMat: ƒ.ComponentMaterial = this.getComponent(ƒ.ComponentMaterial);
      cmpMat.material = Material;
      new ƒ.CoatTextured();
  
  }
}
}