
const Form = ({inputState, handleChange, handleSubmit, isEditing}) => {

    return (
        <section className='mt-5 mb-4'>
            <div className="container">

                <div className='form-wrapper m-auto bg-info-subtle p-4 rounded-4'>
                    <h2 className='text-center'>{isEditing ? "Update Employee" : "Add Employee"}</h2>

                    <form className='bg-bg-danger' onSubmit={handleSubmit} method="post">

                        {/* name */}
                        <div className='mb-3'>
                            <label className='mb-1' htmlFor="E_name">Employee Name:</label>
                            <input className='form-control' type="text" name='E_name' value={inputState.E_name} onChange={handleChange} id='E_name' />
                        </div>

                        {/* email */}
                        <div className='mb-3'>
                            <label className='mb-1' htmlFor="E_mail">Employee E-mail:</label>
                            <input className='form-control' type="email" name='E_mail' value={inputState.E_mail} onChange={handleChange} id='E_mail' />
                        </div>

                        {/* number */}
                        <div className='mb-3'>
                            <label className='mb-1' htmlFor="E_contact">Employee Contact Number:</label>
                            <input className='form-control' type="tel" name='E_contact' value={inputState.E_contact} onChange={handleChange} id='E_contact' />
                        </div>

                        {/* job role */}
                        <div>
                            <label htmlFor="E_role">Employee Role:</label>

                            <select className='form-select' name="E_role" value={inputState.E_role} onChange={handleChange} id="E_role">
                                <option value="">Select Job Role</option>
                                <option value="admin">Admin</option>
                                <option value="manager">Manager</option>
                                <option value="developer">Developer</option>
                                <option value="designer">Designer</option>
                                <option value="hr">HR</option>
                                <option value="sales">Sales</option>
                                <option value="marketing">Marketing</option>
                                <option value="support">Support</option>
                                <option value="accountant">Accountant</option>
                                <option value="intern">Intern</option>
                                <option value="employee">Employee</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        {/* submit  */}
                        <div className='mt-4 '>
                            <button className='btn btn-outline-success' type="submit">{isEditing ? "Update Employee" : "Add Employee"}</button>
                        </div>
                    </form>

                </div>
            </div>
        </section>

    );

}

export default Form;