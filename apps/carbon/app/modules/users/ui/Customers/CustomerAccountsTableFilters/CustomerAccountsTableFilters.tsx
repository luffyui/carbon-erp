import { Button, HStack, Select } from "@carbon/react";
import { Link } from "@remix-run/react";
import { IoMdAdd } from "react-icons/io";
import { DebouncedInput } from "~/components/Search";
import { usePermissions, useUrlParams } from "~/hooks";
import type { CustomerType } from "~/modules/sales";

type CustomerAccountsTableFiltersProps = {
  customerTypes: Partial<CustomerType>[];
};

const CustomerAccountsTableFilters = ({
  customerTypes,
}: CustomerAccountsTableFiltersProps) => {
  const [params, setParams] = useUrlParams();
  const permissions = usePermissions();

  const customerTypeOptions =
    customerTypes?.map((type) => ({
      value: type.id,
      label: type.name,
    })) ?? [];

  return (
    <HStack
      className="px-4 py-3 justify-between border-b border-border w-full"
      spacing={4}
    >
      <HStack>
        <DebouncedInput param="name" size="sm" placeholder="Search" />
        <Select
          size="sm"
          value={customerTypeOptions.find(
            (type) => type.value === params.get("type")
          )}
          isClearable
          options={customerTypeOptions}
          onChange={(selected) => {
            setParams({ type: selected?.value });
          }}
          aria-label="Customer Type"
          placeholder="Customer Type"
        />
        <Select
          size="sm"
          value={
            params.get("active") === "false"
              ? { value: "false", label: "Inactive" }
              : { value: "true", label: "Active" }
          }
          options={[
            {
              value: "true",
              label: "Active",
            },
            {
              value: "false",
              label: "Inactive",
            },
          ]}
          onChange={(selected) => {
            setParams({ active: selected?.value });
          }}
          aria-label="Active"
        />
      </HStack>
      <HStack>
        {permissions.can("create", "users") && (
          <Button asChild leftIcon={<IoMdAdd />}>
            <Link to={`new?${params.toString()}`}>New Customer</Link>
          </Button>
        )}
      </HStack>
    </HStack>
  );
};

export default CustomerAccountsTableFilters;
