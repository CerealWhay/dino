export const ColorPicker = {
    props: {
        color: String
    },
    emits: ['update:color'],
    data() {
        return {
            selectedColor: 'red',

            availableColors: [
                'white',
                'black',
                'red',
                'green',
                'blue',
            ]
        }
    },
    watch: {
        selectedColor() {
            this.$emit('update:color', this.selectedColor)
        }
    },
    // language=Vue
    template: `
    
    <div class="color-picker">
    
        <ul class="color-picker__colors">
          <li v-for="color in availableColors" @click="selectedColor = color" class="color">
            {{ color }}
          </li>
        </ul>
        
        {{selectedColor}}
    </div>
    
    `
}