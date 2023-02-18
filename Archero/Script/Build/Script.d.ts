declare namespace Archero {
    import ƒAid = FudgeAid;
    class CharacterNode extends ƒAid.NodeSprite {
        walkAnim: ƒAid.SpriteSheetAnimation;
        shootAnim: ƒAid.SpriteSheetAnimation;
        constructor();
        changeAnim(_type: string): void;
    }
}
declare namespace Archero {
    import ƒ = FudgeCore;
    class CharacterScript extends ƒ.ComponentScript {
        static readonly iSubclass: number;
        characterIsMoving: boolean;
        constructor();
        hndEvent: (_event: Event) => void;
        walkLeft(): void;
        walkRight(): void;
        walkForward(): void;
        walkBackwards(): void;
        walkLeftForward(): void;
        walkRightForward(): void;
        walkLeftBackwards(): void;
        walkRightBackwards(): void;
        private update;
    }
}
declare namespace Archero {
    import ƒAid = FudgeAid;
    import ƒ = FudgeCore;
    class EnemyNode extends ƒAid.NodeSprite {
        enemyLiveAmount: number;
        constructor(_name: string, pos: ƒ.Vector3);
    }
}
declare namespace Archero {
    import ƒ = FudgeCore;
    class GameState extends ƒ.Mutable {
        protected reduceMutator(_mutator: ƒ.Mutator): void;
        liveAmount: number;
        private controller;
        constructor();
    }
}
declare namespace Archero {
    import ƒ = FudgeCore;
    let enemyBulletImage: ƒ.TextureImage;
    let shootingTimeOut: boolean;
    let closestEnemyNumber: number;
    let closestEnemy: EnemyNode;
    let enemyArray: EnemyNode[];
    let characterSpeed: number;
    let enemySpeed: number;
    let lastPosition: ƒ.ComponentTransform;
    let lastEnemyPosition: ƒ.ComponentTransform;
    let characterImage: ƒ.TextureImage;
    let reloadImage: ƒ.TextureImage;
    let EnemyImage: ƒ.TextureImage;
    let enemyAttackspeed: number;
    let transformcharacter: ƒ.ComponentTransform;
    let viewport: ƒ.Viewport;
    let character: ƒ.Node;
    let gameState: GameState;
    let enemy_bullet_counter: number;
    let enemy_bullet_direction: ƒ.Vector3[];
    let currentEnemyBullets: ƒ.Node[];
}
declare namespace Archero {
    import ƒAid = FudgeAid;
    enum STATE {
        IDLE = 0,
        HUNT = 1,
        SHOOT = 2,
        DEAD = 3,
        CHECK = 4
    }
    export class StateMachine extends ƒAid.ComponentStateMachine<STATE> {
        static readonly iSubclass: number;
        private static instructions;
        static enemyShootingTimeout: boolean;
        constructor();
        static get(): ƒAid.StateMachineInstructions<STATE>;
        private static transitDefault;
        private static actDefault;
        private static actIdle;
        private static actHunt;
        private static actShoot;
        private static actDead;
        private static actCheck;
        private hndEvent;
        private update;
    }
    export {};
}
