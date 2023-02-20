export const MainMenu =  {
    props: {
        isNewGame: {
            type: Boolean,
            required: false,
        },
        score: {
            type: Number,
            required: false,
        },
    },
    methods: {
        startNewGame() {
            this.$emit('start');
        }

    },
    // language=Vue
    template: `

      <div class="main-menu">
      <div class="menu-wrapper">

        <div class="score">
          Your score:
          <span class="score-num">
            {{ score }}
          </span>
        </div>
        
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