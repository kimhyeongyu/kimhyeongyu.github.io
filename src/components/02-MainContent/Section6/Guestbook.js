import { useState, useEffect } from 'react';
import './Guestbook.css';
import GuestbookModal from './GuestbookModal';
import GuestbookWriteModal from './GuestbookWriteModal';
import GuestbookDeleteModal from './GuestbookDeleteModal';

function Guestbook() {
    const [entries, setEntries] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // 현재 선택된 페이지
    const itemsPerPage = 3; // 페이지당 항목 수
    const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deletePassword, setDeletePassword] = useState('');
    const [selectedEntry, setSelectedEntry] = useState(null);
    const [formData, setFormData] = useState({ name: '', password: '', message: '' });

    // 페이지 범위 초기값 설정
    const [pageRange, setPageRange] = useState({ start: 1, end: 1 });

    // 총 페이지 수 계산
    const totalPages = Math.ceil(entries.length / itemsPerPage);

    useEffect(() => {
        fetchEntries();
    }, []);

    useEffect(() => {
        // 페이지 범위 업데이트
        setPageRange({
            start: 1,
            end: Math.min(5, totalPages), // 최대 5페이지까지 표시
        });
    }, [totalPages]);

    const fetchEntries = async () => {
        try {
            const response = await fetch('https://sn0711.mycafe24.com/weddingapi/guestbook');
            const data = await response.json();
            if (data.success) {
                setEntries(data.entries);
            } else {
                console.error('Failed to fetch entries');
            }
        } catch (error) {
            console.error('Error fetching entries:', error);
        }
    };

    const openDetailModal = (entry) => {
        setSelectedEntry(entry);
        setIsDetailModalOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeDetailModal = () => {
        setSelectedEntry(null);
        setIsDetailModalOpen(false);
        document.body.style.overflow = 'auto';
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const openWriteModal = () => {
        setFormData({ name: '', password: '', message: '' });
        setIsWriteModalOpen(true);
    };

    const closeWriteModal = () => {
        setFormData({ name: '', password: '', message: '' });
        setIsWriteModalOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://sn0711.mycafe24.com/weddingapi/guestbook', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams(formData).toString(),
            });

            const data = await response.json();
            if (data.success && data.entry) {
                setEntries([data.entry, ...entries]);
                setFormData({ name: '', password: '', message: '' });
                closeWriteModal();
            } else {
                console.error('Failed to submit entry');
            }
        } catch (error) {
            console.error('Error submitting entry:', error);
        }
    };

    const handleDeleteSubmit = async () => {
        if (deletePassword) {
            try {
                const response = await fetch('https://sn0711.mycafe24.com/weddingapi/guestbook/delete', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: new URLSearchParams({
                        id: selectedEntry.id,
                        password: deletePassword,
                    }).toString(),
                });

                const data = await response.json();
                if (data.success) {
                    setEntries(entries.filter((entry) => entry.id !== selectedEntry.id));
                    setIsDeleteModalOpen(false);
                    setDeletePassword('');
                    alert('방명록 삭제 완료');
                } else {
                    alert('비밀번호가 일치하지 않습니다.');
                }
            } catch (error) {
                console.error('Error deleting entry:', error);
                alert('방명록 삭제 중 오류가 발생했습니다.');
            }
        } else {
            alert('비밀번호를 입력하세요.');
        }
    };

    // 현재 페이지의 항목 계산
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentEntries = entries.slice(startIndex, endIndex);

    // 페이지 변경
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // 다음 범위로 이동
    const handleNextRange = () => {
        if (pageRange.end < totalPages) {
            const newStart = pageRange.start + 5;
            const newEnd = Math.min(pageRange.end + 5, totalPages);

            setPageRange({ start: newStart, end: newEnd });
            setCurrentPage(newStart); // 다음 범위의 첫 페이지로 이동
        }
    };

    // 이전 범위로 이동
    const handlePrevRange = () => {
        if (pageRange.start > 1) {
            const newStart = Math.max(pageRange.start - 5, 1);
            const newEnd = pageRange.start - 1;

            setPageRange({ start: newStart, end: newEnd });
            setCurrentPage(newEnd); // 이전 범위의 마지막 페이지로 이동
        }
    };

    return (
        <div className="guestbook-container">
            <div data-aos="fade-up" data-aos-duration="1500" data-aos-delay="200">
                <span className="guestbook-container-title" style={{ marginBottom: '44px' }}>
                    <span style={{ fontSize: '12px', letterSpacing: '3px'}}>GUEST BOOK</span>
                </span>
                <div className="guestbook-entries">
                    {currentEntries.map((entry, index) => (
                        <div className="guestbook-card" key={index} onClick={() => openDetailModal(entry)}>
                            <div className="guestbook-card-header">
                                <span className="guestbook-list-name">{entry.name}</span>
                                <span className="date-span">
                                    {entry.created_at}
                                    <button
                                        className="delete-button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedEntry(entry);
                                            setIsDeleteModalOpen(true);
                                        }}
                                    >
                                        x
                                    </button>
                                </span>
                            </div>
                            <div className="guestbook-card-body">{entry.message}</div>
                        </div>
                    ))}
                </div>

                {totalPages > 0 && entries.length > 0 && (
                    <div className="pagination">
                        {pageRange.start > 1 && (
                            <button
                                onClick={handlePrevRange}
                                className="pagination-button"
                            >
                                &lt;
                            </button>
                        )}
                        {pageRange.end >= pageRange.start && Array.from(
                            { length: pageRange.end - pageRange.start + 1 },
                            (_, i) => pageRange.start + i
                        ).map((pageNumber) => (
                            <button
                                key={pageNumber}
                                className={`pagination-button ${currentPage === pageNumber ? 'active' : ''}`}
                                onClick={() => handlePageChange(pageNumber)}
                            >
                                {pageNumber}
                            </button>
                        ))}
                        {pageRange.end < totalPages && (
                            <button
                                onClick={handleNextRange}
                                className="pagination-button"
                            >
                                &gt;
                            </button>
                        )}
                    </div>
                )}

                <div className="button-container">
                    <button onClick={openWriteModal} className="write-button">
                        글쓰기
                    </button>
                </div>

                <GuestbookModal isOpen={isDetailModalOpen} onClose={closeDetailModal}>
                    <span className="guestbook-modal-title">{selectedEntry?.name}</span>
                    <span className="guestbook-modal-text">
                        <p>{selectedEntry?.message}</p>
                    </span>
                </GuestbookModal>

                <GuestbookWriteModal
                    isOpen={isWriteModalOpen}
                    onClose={closeWriteModal}
                    formData={formData}
                    handleInputChange={handleInputChange}
                    handleSubmit={handleSubmit}
                />

                <GuestbookDeleteModal
                    isOpen={isDeleteModalOpen}
                    onClose={() => setIsDeleteModalOpen(false)}
                    deletePassword={deletePassword}
                    setDeletePassword={setDeletePassword}
                    handleDeleteSubmit={handleDeleteSubmit}
                />
            </div>
        </div>
    );
}

export default Guestbook;
