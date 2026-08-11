import Form from '../main/Form';
import ViewData from '../main/ViewData';

const Main = ({ inputState, handleChange, handleSubmit, employees, handleDelete, handleEdit, isEditing, search, handleSearch, currentPage, totalPages, handlePageChange, handleNextPage, handlePreviousPage, sortType, handleSort }) => {

    return (
        <main>

            {/* form */}
            <Form
                inputState={inputState}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                isEditing={isEditing}
            />

            <hr />

            <ViewData
                employees={employees}
                search={search}
                handleSearch={handleSearch}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
                currentPage={currentPage}
                totalPages={totalPages}
                handlePageChange={handlePageChange}
                handleNextPage={handleNextPage}
                handlePreviousPage={handlePreviousPage}
                sortType={sortType}
                handleSort={handleSort}
            />

        </main>
    )

}

export default Main;