const Validation = (inputState) => {

    let field = [];

    if (inputState.E_name == '') {
        field.push("Name")

    }
    if (inputState.E_mail == '') {
        field.push("E-mail")

    }
    if (inputState.E_contact == '') {
        field.push("Contact number")

    }
    if (inputState.E_role == '') {
        field.push("Employee role")

    }

    const err = field.join(", ")

    if (err != '') {
        alert(`Empty Field(s): ${err}`);
        return false;
    }

    if(isNaN(inputState.E_contact) || inputState.E_contact.length > 10 || inputState.E_contact.length < 10){
        alert("Enter a valid contact number !");
        return false;
    }

    return true

}

export default Validation