import { useEffect, useState } from 'react'


const ViewData = ({ employees, handleDelete, handleEdit, search, handleSearch, currentPage, totalPages, handlePageChange, handleNextPage, handlePreviousPage, sortType, handleSort }) => {

    return (
        <section >
            <div className="container-md">

                <div className="d-flex align-items-center justify-content-between">
                    <h2>Employee Data</h2>
                    <div className="d-flex gap-2">
                        <input className="form-control" type="search" name="search" value={search} onChange={handleSearch} placeholder="Search" />
                        <select className="form-select" name="data-sort" value={sortType} onChange={handleSort}>
                            <option value="A-Z">A-Z</option>
                            <option value="Z-A">Z-A</option>
                        </select>
                    </div>
                </div>

                <div className='table-responsive rounded-3 border border-2 mt-3 mb-5 overflow-auto'>
                    <table className="table mb-0 table-hover">
                        <thead>
                            <tr>
                                <th className='text-center' colSpan="6">Employees Data Table</th>
                            </tr>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Name</th>
                                <th scope="col">E-Mail</th>
                                <th scope="col">Contact Number</th>
                                <th scope="col">Role</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.length == 0 ? (
                                <tr>
                                    <td className="text-center" colSpan="6">No data</td>
                                </tr>
                            ) : (
                                employees.map((item, key) => (
                                        <tr key={key}>
                                            <th scope='row'>{item._id}</th>
                                            <td>{item.E_name}</td>
                                            <td>{item.E_mail}</td>
                                            <td>{item.E_contact}</td>
                                            <td className='text-capitalize'>{item.E_role}</td>
                                            <td className="d-flex gap-1">
                                                <button className="btn btn-outline-success" onClick={() => handleEdit(item._id)}>Edit</button>
                                                <button className="btn btn-outline-danger" onClick={() => handleDelete(item._id)}>Delete</button>
                                            </td>
                                        </tr>
                                    ))
                            )
                            }
                        </tbody>

                        {/* pagination */}
                        <tfoot>
                            <tr>
                                <td colSpan={'6'}>
                                    <div className="d-flex gap-2">

                                        {/* previous btn */}
                                        <button className="btn btn-outline-dark" onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</button>

                                        <div className="d-flex gap-1">
                                            {
                                                Array(totalPages).fill(0).map((item, index) => (
                                                    <button key={index} className={`btn btn-outline-dark ${currentPage === (index + 1) ? 'active' : ''}`} onClick={() => { handlePageChange(index + 1) }}>{index + 1}</button>
                                                ))
                                            }
                                        </div>

                                        {/* next btn */}
                                        <button className="btn btn-outline-dark" onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
                                    </div>
                                </td>
                            </tr>
                        </tfoot>
                    </table>

                </div>
            </div>
        </section>
    )

}

export default ViewData;