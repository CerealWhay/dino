export const Overlay =  {
    props: {
        score: {
            type: Number,
            required: true,
        }
    },
    // language=Vue
    template: `

      <div class="overlay">
      <div class="score-ui">
        Your score: 
        <span class="score-num">
          {{ score }}
        </span>
      </div>
      </div>

    `
}