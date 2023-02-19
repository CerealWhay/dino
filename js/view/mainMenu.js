export const MainMenu =  {
    data() {
        return {
            isNewGame: true,
        }
    },
    methods: {
        startNewGame() {
            this.isNewGame = false;
            this.$emit('start');
        }

    },
    // language=Vue
    template: `

      <div class="main-menu">
      <div class="menu-wrapper">
        <div 
            v-if="isNewGame"
            class="btn btn--start"
            @click="startNewGame"
        >
          Start new Game
        </div>
        
        <div
            v-if="!isNewGame"
            class="btn btn--resume" 
            @click="$emit('resume');"
        >
          Resume game
        </div>
      </div>
      </div>

    `
}