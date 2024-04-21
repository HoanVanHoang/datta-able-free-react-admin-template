import React, { useEffect, useState } from 'react';
import { Card, Table, Button } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import useWindowSize from '../../hooks/useWindowSize';
import { useNavigate } from 'react-router-dom';


const UserList = () => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [searchData, setSearchData] = useState({
        keyword: ""
    });

    const navigate = useNavigate();

    const handleAddClick = () => {
    // Thay 'yourParam' bằng param bạn muốn truyền
    navigate('/users/create?from=list-user');
};
    const windowSize = useWindowSize();
    useEffect(() => {
        console.log("user effect", currentPage)
        let newUsers = getData(currentPage);
        setUsers(newUsers)
        console.log(users)
        setTotalPage(10)
    }, [currentPage, windowSize]);
    const pagnitionHandle = (number) => {
        console.log("change page", number)
        setCurrentPage(number.selected)
    }
    const getData = (currentPage) => {
        const newUsers = [
            { name: 'hoan', age: '20', current_page: currentPage },
            { name: 'nguyen', age: '25', current_page: currentPage },
            // thêm người dùng khác vào đây
        ];
        return newUsers;
    }
    const handleChange = (event) => {
        const { name, value } = event.target;
        setSearchData({
            ...searchData,
            [name]: value,
        });
        console.log(searchData);
    }
    return (
        <React.Fragment>
            <Card>
                <Card.Header>
                    <Card.Title as="h5">Danh sách người dùng</Card.Title>
                    <div className='mt-5 row justify-content-between'>

                        <div className="d-flex col-md-6">
                            <input type="text" value={searchData.keyword} onChange={handleChange}
                                className="form-control" placeholder="Search . . ." style={{ width: '80%' }} />
                            <Button variant={'primary'} className="text-capitalize ms-2">
                                Search
                            </Button>
                        </div>
                        <div className="d-flex  col-md-6 justify-content-end ">
                            <Button variant={'primary'} className="text-capitalize ms-2"> UPDATE </Button>
                            <Button variant={'primary'} className="text-capitalize ms-2" onClick={handleAddClick}> ADD </Button>
                        </div>

                    </div>
                </Card.Header>
                <Card.Body>
                    <Table responsive>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Page</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{user.name}</td>
                                    <td>{user.age}</td>
                                    <td>{user.current_page}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <ReactPaginate
                        breakLabel="..."
                        nextLabel="next >"
                        onPageChange={pagnitionHandle}
                        pageRangeDisplayed={5}
                        pageCount={totalPage}
                        previousLabel="< previous"
                        renderOnZeroPageCount={null}
                        breakClassName={'page-item'}
                        breakLinkClassName={'page-link'}
                        containerClassName={'pagination'}
                        pageClassName={'page-item'}
                        pageLinkClassName={'page-link'}
                        previousClassName={'page-item'}
                        previousLinkClassName={'page-link'}
                        nextClassName={'page-item'}
                        nextLinkClassName={'page-link'}
                        activeClassName={'active'}
                    />
                </Card.Body>
            </Card>
        </React.Fragment>
    );
}
export default UserList;