export default function Paginator({ currentPage, totalPages, setCurrentPage, limit, setLimit, setLoading }) {
    return (
        <div className="w-full h-[50px] flex flex-row justify-center items-center gap-[20px]">
            <select
                className="w-[100px] h-[40px] border border-gray-300 rounded-b-md p-[10px]"
                value={currentPage}
                onChange={(e) => setCurrentPage(parseInt(e.target.value))}
            >
                {
                    Array.from({ length: totalPages }, (_, index) => (
                        <option key={index} value={index + 1}>
                            page {index + 1}
                        </option>
                    ))
                }
            </select>

            <select
                className="w-[100px] h-[40px] border border-gray-300 rounded-b-md p-[10px]"
                value={limit}
                onChange={(e) => {
                    setLoading(true),
                    setLimit(parseInt(e.target.value))}}
            >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
            </select>

            <span className="text-gray-500">
                page {currentPage} of {totalPages}
            </span>
        </div>
    )
}
