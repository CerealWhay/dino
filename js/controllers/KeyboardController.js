
export const KeyboardController =  {
    data() {
        return {
            controls: {
                isPlayerUp: false,
                isPlayerDown: false,
                isPlayerLeft: false,
                isPlayerRight: false,
            }
        }
    },
    created() {
        window.addEventListener('keydown', this.keyboardEventKeydown);
        window.addEventListener('keyup', this.keyboardEventKeyup);
    },
    beforeDestroy() {
        window.removeEventListener('keydown', this.keyboardEventKeydown);
        window.removeEventListener('keyup', this.keyboardEventKeyup);
    },
    methods: {
        keyboardEventKeydown (e) {
            if (e.code === "Escape") {
                this.$emit('pause');
                return;
            }

            switch(e.code) {
                case 'KeyW' :
                    this.controls.isPlayerUp = true;
                    break
                case 'KeyS' :
                    this.controls.isPlayerDown = true;
                    break
                case 'KeyA' :
                    this.controls.isPlayerLeft = true;
                    break
                case 'KeyD' :
                    this.controls.isPlayerRight = true;
                    break
            }
            this.$emit('changeControls', this.controls);
        },
        keyboardEventKeyup (e) {
            switch(e.code) {
                case 'KeyW' :
                    this.controls.isPlayerUp = false;
                    break
                case 'KeyS' :
                    this.controls.isPlayerDown = false;
                    break
                case 'KeyA' :
                    this.controls.isPlayerLeft = false;
                    break
                case 'KeyD' :
                    this.controls.isPlayerRight = false;
                    break
            }
            this.$emit('changeControls', this.controls);
        },
    },
}