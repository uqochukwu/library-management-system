import MemberStatusBadge from "./MemberStatusBadge";

const MemberCard = ({member, onView}) => {
    return (
        <article className="member-card">
        <div>
            <h3>{member.firstName} {member.lastName}</h3>
            <p>{member.email}</p>
            <MemberStatusBadge active={member.active} />
        </div>
        <button onClick={() => onView(member.id)}>View Details</button>
        </article>
    )
}

export default MemberCard