import { Form, Input, Modal, Select } from 'antd'
import { MemberList } from './list'
import { useModalForm, useSelect } from '@refinedev/antd'
import { useGo } from '@refinedev/core';
import { CREATE_MEMBER_MUTATION } from '@/graphql/mutations';
import { USERS_SELECT_QUERY } from '@/graphql/queries';
import SelectMembership from '@/components/selectmembership';


const Create = () => {

    const go = useGo();

    const goToListPage = () => {
        go({
            to: { resource: 'member', action: 'list'},
            options: { keepQuery: true },
            type: 'replace',
        })
    }
  
  const {formProps, modalProps} = useModalForm({
    action: 'create',
    defaultVisible: true,
    resource: 'member',
    redirect: false,
    mutationMode: 'pessimistic', //this means that redirection and UI updates are executed only after the mutation is fully successful
    onMutationSuccess: goToListPage,
    meta: {  
        gqlMutation: CREATE_MEMBER_MUTATION
    }
  })

  const {selectProps, queryResult } = useSelect({
    resource: 'users',
    optionLabel: 'name',
    meta: {
        gqlQuery: USERS_SELECT_QUERY
    }

  })

  return (
    <MemberList>
        <Modal
          {...modalProps}
          mask={true}
          onCancel={goToListPage}
          title="Add Member"
          width = {512}
        >
        <Form {...formProps} layout="vertical">
          <Form.Item 
            label="Member Name"
            name="name"
            rules={[{required: true}]}
          >
            <Input placeholder='PLease Enter Member name'/>
          </Form.Item>
          <Form.Item
            label="Membership Type"
            name="membershiptype"
            rules={[{required: true}]}
          >
            <Select 
              placeholder='Please Enter Membership Type' 
              {...selectProps}
              options={
                queryResult.data?.data.map((user) => ({
                  values: user.id,
                  label: (
                    <SelectMembership 
                      name={user.name}  
                      avatarUrl={user.avatarUrl ?? undefined}
                    />
                  )
                }))
              }
            />
          </Form.Item>
        </Form>
        </Modal>
    </MemberList>
  )
}

export default Create
