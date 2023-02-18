namespace Archero {
    import ƒ = FudgeCore;
    import ƒui = FudgeUserInterface;
  
    export class GameState extends ƒ.Mutable {
      protected reduceMutator(_mutator: ƒ.Mutator): void {/* */}
      public liveAmount: number = 100;
      private controller: ƒui.Controller;

      constructor() {
        super();
        this.controller = new ƒui.Controller(this, document.querySelector("#vui"));
        console.log(this.controller);
      }
    }
  }