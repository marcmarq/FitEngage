type Props = {
  memberName: string,
  avatarUrl?: string;
  shape?: 'circle' | 'square'
}

const SelectMembership = ({ avatarUrl, memberName, shape }: Props) => {
  return (
    <div>
      Select Membership for {memberName}
    </div>
  )
}

export default SelectMembership;
