
export const KeyboardEvents =  {
    created() {
        const component = this;
        this.keydownHandler = function (e) {
            component.$emit('keydown', e);
        }
        window.addEventListener('keydown', this.keydownHandler);

        this.keyupHandler = function (e) {
            component.$emit('keyup', e);
        }
        window.addEventListener('keyup', this.keyupHandler);

    },
    beforeDestroy() {
        window.removeEventListener('keydown', this.keydownHandler);
        window.removeEventListener('keyup', this.keyupHandler);
    }
}