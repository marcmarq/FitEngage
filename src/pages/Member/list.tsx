import { MEMBER_LIST_QUERY } from "@/graphql/queries";
import { SearchOutlined } from "@ant-design/icons";
import {
  CreateButton,
  DeleteButton,
  EditButton,
  FilterDropdown,
  List,
  useTable,
} from "@refinedev/antd";
import { getDefaultFilter, useGo } from "@refinedev/core";
import { Input, Space, Table } from "antd";

export const MemberList = ({children}: React.PropsWithChildren) => {
  const go = useGo();
  const { tableProps, filters } = useTable({
    resource: "companies",
    pagination: {
      pageSize: 12,
    },
    sorters: {
      initial: [
        {
          field: 'createdAt',
          order: 'desc'
        }
      ],
    },
      filters: {
        initial: [
          {
          field: 'name',
          operator: 'contains',
          value: undefined
          }
        ]
      },
    meta: {
      gqlQuery: MEMBER_LIST_QUERY,
    }
  })

  return (
    <div>
    <List
      breadcrumb={false}
      headerButtons={() => (
        <CreateButton
          onClick={() => {
            go({
              to: {
                resource: "members", //please refer to the dats for the member
                action: "create",
              },
              options: {
                keepQuery: true,
              },
              type: "replace",
            });
          }}
        />
      )}
    >
      <Table
        {...tableProps}
        pagination={{
          ...tableProps.pagination,
        }}
      >
        <Table.Column
          dataIndex=""
          title="Member List"
          defaultFilteredValue={getDefaultFilter("id, filters")}
          filterIcon={<SearchOutlined />}
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Input placeholder="Search Member" />
            </FilterDropdown>
          )}
        />
        <Table.Column dataIndex="" title="Payments" />
        <Table.Column
          dataIndex="id"
          title="Actions"
          fixed="right"
          render={(value) => (
            <Space>
              <EditButton hideText size="small" recordItemId={value} />
              <DeleteButton hideText size="small" recordItemId={value} />
            </Space>
          )}
        />
      </Table>
    </List>
    {children}
    </div>
  );
};
