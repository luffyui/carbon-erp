import { Hyperlink } from "@carbon/react";
import { MenuItem } from "@chakra-ui/react";
import { useNavigate } from "@remix-run/react";
import type { ColumnDef } from "@tanstack/react-table";
import { memo, useMemo } from "react";
import { BsPencilSquare } from "react-icons/bs";
import { Table } from "~/components";
import type { Customer } from "~/modules/sales";
import { path } from "~/utils/path";

type CustomersTableProps = {
  data: Customer[];
  count: number;
};

const CustomersTable = memo(({ data, count }: CustomersTableProps) => {
  const navigate = useNavigate();

  const columns = useMemo<ColumnDef<Customer>[]>(() => {
    return [
      {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => (
          <Hyperlink
            onClick={() => navigate(path.to.customer(row.original.id!))}
          >
            {row.original.name}
          </Hyperlink>
        ),
      },
      {
        accessorKey: "type",
        header: "Customer Type",
        cell: (item) => item.getValue(),
      },
      {
        accessorKey: "status",
        header: "Customer Status",
        cell: (item) => item.getValue(),
      },
      // {
      //   id: "orders",
      //   header: "Orders",
      //   cell: ({ row }) => (
      //
      //       <Button
      //         variant="secondary"
      //         onClick={() =>
      //           navigate(`${path.to.salesOrders}?customerId=${row.original.id}`)
      //         }
      //       >
      //         {row.original.orderCount ?? 0} Orders
      //       </Button>
      //   ),
      // },
    ];
  }, [navigate]);

  const renderContextMenu = useMemo(
    // eslint-disable-next-line react/display-name
    () => (row: Customer) =>
      (
        <MenuItem
          icon={<BsPencilSquare />}
          onClick={() => navigate(path.to.customer(row.id!))}
        >
          Edit Customer
        </MenuItem>
      ),
    [navigate]
  );

  return (
    <>
      <Table<Customer>
        count={count}
        columns={columns}
        data={data}
        withPagination
        renderContextMenu={renderContextMenu}
      />
    </>
  );
});

CustomersTable.displayName = "CustomerTable";

export default CustomersTable;
