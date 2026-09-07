const EmptyState = ({
    title = "No members found",
    message = "There are currently no memebers to display.",
}) => {
    return (
        <div className="empty-state">
            <h3>{title}</h3>
            <p>{message}</p>
        </div>
    )
}

export default EmptyState