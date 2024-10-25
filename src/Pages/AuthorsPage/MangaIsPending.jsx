import React, { useState } from 'react'
import { Image, Pagination, Table } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { PaginationComponent } from '../../Components/PanigateComponent/PanigateComponent';

export const MangaIsPending = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Giả sử bạn có một danh sách item
    const items = Array.from({ length: 50 }, (_, i) => `Item ${i + 1}`);

    // Tính toán để cắt danh sách item cho từng trang
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className='DefaultAuthors__right__Content'>
            <h2>Truyện đang đợi duyệt (tất cả truyện)</h2>

            <div className='DefaultAuthors__right__Content__addmangabtn'>
                <NavLink to='/author/dang-truyen'>Đăng phẩm mới</NavLink>
            </div>

            <Table className='DefaultAuthors__right__Content__table' bordered hover>
                <thead>
                    <tr>
                        <th class="text-center">#</th>
                        <th class="text-center">Tên Truyện</th>
                        <th class="text-center">Thumbnail</th>
                        <th class="text-center">Tóm tác nội dung</th>
                        <th class="text-center">Tình Trạng</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className='DefaultAuthors__right__Content__table__contentTd'>1</td>
                        <td className='DefaultAuthors__right__Content__table__contentTd'>One Piece</td>
                        <td className='DefaultAuthors__right__Content__table__contentTd'>
                            <Image height={170} src='https://ddntcthcd.com/nettruyen/thumb/one-piece.jpg' alt='thumbnail' />
                        </td>
                        <td className='DefaultAuthors__right__Content__table__contentTd'>
                            <span className='DefaultAuthors__right__Content__table__contentTd__text'>
                                One Piece là câu truyện kể về Luffy và các thuyền viên của mình. Khi còn nhỏ, Luffy ước mơ trở thành Vua Hải Tặc. Cuộc sống của cậu bé thay đổi khi cậu vô tình có được sức mạnh có thể co dãn như cao su, nhưng đổi lại, cậu không bao giờ có thể bơi được nữa. Giờ đây, Luffy cùng những người bạn hải tặc của mình ra khơi tìm kiếm kho báu One Piece, kho báu vĩ đại nhất trên thế giới. Trong One Piece, mỗi nhân vật trong đều mang một nét cá tính đặc sắc kết hợp cùng các tình huống kịch tính, lối dẫn truyện hấp dẫn chứa đầy các bước ngoặt bất ngờ và cũng vô cùng hài hước đã biến One Piece trở thành một trong những bộ truyện nổi tiếng nhất không thể bỏ qua. Hãy đọc One Piece để hòa mình vào một thế giới của những hải tặc rộng lớn, đầy màu sắc, sống động và thú vị, cùng đắm chìm với những nhân vật yêu tự do, trên hành trình đi tìm ước mơ của mình.
                            </span>
                        </td>
                        <td className='DefaultAuthors__right__Content__table__contentTd'>
                            <span className='DefaultAuthors__right__Content__table__contentTd__status'>Đã Duyệt</span>
                        </td>
                    </tr>
                    <tr>
                        <td className='DefaultAuthors__right__Content__table__contentTd'>1</td>
                        <td className='DefaultAuthors__right__Content__table__contentTd'>One Piece</td>
                        <td className='DefaultAuthors__right__Content__table__contentTd'>
                            <Image height={170} src='https://ddntcthcd.com/nettruyen/thumb/one-piece.jpg' alt='thumbnail' />
                        </td>
                        <td className='DefaultAuthors__right__Content__table__contentTd'>
                            <span className='DefaultAuthors__right__Content__table__contentTd__text'>
                                One Piece là câu truyện kể về Luffy và các thuyền viên của mình. Khi còn nhỏ, Luffy ước mơ trở thành Vua Hải Tặc. Cuộc sống của cậu bé thay đổi khi cậu vô tình có được sức mạnh có thể co dãn như cao su, nhưng đổi lại, cậu không bao giờ có thể bơi được nữa. Giờ đây, Luffy cùng những người bạn hải tặc của mình ra khơi tìm kiếm kho báu One Piece, kho báu vĩ đại nhất trên thế giới. Trong One Piece, mỗi nhân vật trong đều mang một nét cá tính đặc sắc kết hợp cùng các tình huống kịch tính, lối dẫn truyện hấp dẫn chứa đầy các bước ngoặt bất ngờ và cũng vô cùng hài hước đã biến One Piece trở thành một trong những bộ truyện nổi tiếng nhất không thể bỏ qua. Hãy đọc One Piece để hòa mình vào một thế giới của những hải tặc rộng lớn, đầy màu sắc, sống động và thú vị, cùng đắm chìm với những nhân vật yêu tự do, trên hành trình đi tìm ước mơ của mình.
                            </span>
                        </td>
                        <td className='DefaultAuthors__right__Content__table__contentTd'>
                            <span
                                style={{ color: '#0dcaf0', border: '1px solid #0dcaf0' }}
                                className='DefaultAuthors__right__Content__table__contentTd__status'
                            >
                                Đang chờ
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td className='DefaultAuthors__right__Content__table__contentTd'>1</td>
                        <td className='DefaultAuthors__right__Content__table__contentTd'>One Piece</td>
                        <td className='DefaultAuthors__right__Content__table__contentTd'>
                            <Image height={170} src='https://ddntcthcd.com/nettruyen/thumb/one-piece.jpg' alt='thumbnail' />
                        </td>
                        <td className='DefaultAuthors__right__Content__table__contentTd'>
                            <span className='DefaultAuthors__right__Content__table__contentTd__text'>
                                One Piece là câu truyện kể về Luffy và các thuyền viên của mình. Khi còn nhỏ, Luffy ước mơ trở thành Vua Hải Tặc. Cuộc sống của cậu bé thay đổi khi cậu vô tình có được sức mạnh có thể co dãn như cao su, nhưng đổi lại, cậu không bao giờ có thể bơi được nữa. Giờ đây, Luffy cùng những người bạn hải tặc của mình ra khơi tìm kiếm kho báu One Piece, kho báu vĩ đại nhất trên thế giới. Trong One Piece, mỗi nhân vật trong đều mang một nét cá tính đặc sắc kết hợp cùng các tình huống kịch tính, lối dẫn truyện hấp dẫn chứa đầy các bước ngoặt bất ngờ và cũng vô cùng hài hước đã biến One Piece trở thành một trong những bộ truyện nổi tiếng nhất không thể bỏ qua. Hãy đọc One Piece để hòa mình vào một thế giới của những hải tặc rộng lớn, đầy màu sắc, sống động và thú vị, cùng đắm chìm với những nhân vật yêu tự do, trên hành trình đi tìm ước mơ của mình.
                            </span>
                        </td>
                        <td className='DefaultAuthors__right__Content__table__contentTd'>
                            <span
                                className='DefaultAuthors__right__Content__table__contentTd__status'
                                style={{ color: 'red', border: '1px solid red' }}
                            >
                                Từ chối
                            </span>
                        </td>
                    </tr>
                </tbody>
            </Table>

            {/* panigate */}
            <PaginationComponent
                itemsPerPage={itemsPerPage}
                totalItems={items.length}
                paginate={paginate}
                currentPage={currentPage}
            />


        </div>
    )
}
