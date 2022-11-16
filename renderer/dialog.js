
class Dialog {
    static DialogWrapper = document.getElementById("DialogWrapper");

    AddInput() {
        //<input type="text" class="SignUpInfoInput" id="SignUpUserName"></input>
        let input = document.createElement("input");
        input.className = "DialogInput";
        this.AddedElementWrapper.appendChild(input);

        return input;
    }

    AddButton(text, callback) {
        let button = document.createElement("div");
        button.className = "DialogButton";
        button.innerText = text;
        button.addEventListener("click", callback);
        this.buttons.push(button);
        this.ButtonWrapper.appendChild(button);
    }

    async Show() {

        Dialog.DialogWrapper.style.display = "flex";
        Dialog.DialogWrapper.appendChild(this.dialog);

        return new Promise((resolve, reject) => {
            this.buttons.forEach(button => {
                button.addEventListener("click", () => {
                    this.Hide();
                    resolve();
                });
            });
        });
    }

    Hide() {
        this.dialog.remove();
        if (Dialog.DialogWrapper.getElementsByClassName("Dialog").length == 0) {
            Dialog.DialogWrapper.style.display = "none";
        }
    }

    constructor(mainText, buttonText) {
        this.links = new Array();
        this.dialog = document.createElement("div");
        this.dialog.className = "Dialog";
        let dialogText = document.createElement("div");
        dialogText.className = "DialogText";
        dialogText.innerText = mainText;
        this.AddedElementWrapper = document.createElement("div");
        this.AddedElementWrapper.className = "AddedElementWrapper";

        this.buttons = new Array();
        let closeButton = document.createElement("div");
        closeButton.className = "DialogButton";
        closeButton.innerText = buttonText;
        this.buttons.push(closeButton);
        this.ButtonWrapper = document.createElement("div");
        this.ButtonWrapper.className = "DialogButtonWrapper";
        this.ButtonWrapper.appendChild(closeButton);

        this.dialog.appendChild(dialogText);
        this.dialog.appendChild(this.AddedElementWrapper);
        this.dialog.appendChild(this.ButtonWrapper);
    }

}