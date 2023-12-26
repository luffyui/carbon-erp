import { Heading, VStack } from "@carbon/react";
import { Card, CardBody, CardFooter, CardHeader, Grid } from "@chakra-ui/react";
import { ValidatedForm } from "remix-validated-form";
import { Boolean, Hidden, Number, Select, Submit } from "~/components/Form";
import { usePermissions } from "~/hooks";
import { partCostValidator, partCostingMethods } from "~/modules/parts";
import type { TypeOfValidator } from "~/types/validators";

type PartCostingFormProps = {
  initialValues: TypeOfValidator<typeof partCostValidator>;
};

const PartCostingForm = ({ initialValues }: PartCostingFormProps) => {
  const permissions = usePermissions();

  const partCostingMethodOptions = partCostingMethods.map(
    (partCostingMethod) => ({
      label: partCostingMethod,
      value: partCostingMethod,
    })
  );

  return (
    <ValidatedForm
      method="post"
      validator={partCostValidator}
      defaultValues={initialValues}
    >
      <Card w="full">
        <CardHeader>
          <Heading size="h3">Costing & Posting</Heading>
        </CardHeader>
        <CardBody>
          <Hidden name="partId" />
          <Grid
            gridTemplateColumns={["1fr", "1fr", "1fr 1fr 1fr"]}
            gridColumnGap={8}
            gridRowGap={2}
            w="full"
          >
            <VStack>
              <Select
                name="costingMethod"
                label="Part Costing Method"
                options={partCostingMethodOptions}
              />
              <Number name="standardCost" label="Standard Cost" precision={2} />
              <Number name="unitCost" label="Unit Cost" precision={2} />
            </VStack>
            <VStack>
              <Number
                name="salesHistory"
                label="Sales History"
                precision={2}
                isReadOnly
              />
              <Number
                name="salesHistoryQty"
                label="Sales History Qty"
                precision={2}
                isReadOnly
              />
              <Boolean name="costIsAdjusted" label="Cost Is Adjusted" />
            </VStack>
          </Grid>
        </CardBody>
        <CardFooter>
          <Submit isDisabled={!permissions.can("update", "parts")}>Save</Submit>
        </CardFooter>
      </Card>
    </ValidatedForm>
  );
};

export default PartCostingForm;
