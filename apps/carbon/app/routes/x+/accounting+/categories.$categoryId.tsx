import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { redirect, json } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { validationError } from "remix-validated-form";
import {
  AccountCategoryForm,
  accountCategoryValidator,
  getAccountCategory,
  upsertAccountCategory,
} from "~/modules/accounting";
import { requirePermissions } from "~/services/auth";
import { flash } from "~/services/session";
import { assertIsPost, notFound } from "~/utils/http";
import { error, success } from "~/utils/result";

export async function loader({ request, params }: LoaderArgs) {
  const { client } = await requirePermissions(request, {
    view: "accounting",
    role: "employee",
  });

  const { categoryId } = params;
  if (!categoryId) throw notFound("Invalid categoryId");

  const accountCategory = await getAccountCategory(client, categoryId);
  if (accountCategory.error) {
    return redirect(
      "/x/accounting/categories",
      await flash(
        request,
        error(accountCategory.error, "Failed to fetch G/L account category")
      )
    );
  }

  return json({ accountCategory: accountCategory.data });
}

export async function action({ request, params }: ActionArgs) {
  assertIsPost(request);
  const { client, userId } = await requirePermissions(request, {
    update: "accounting",
  });

  const validation = await accountCategoryValidator.validate(
    await request.formData()
  );

  if (validation.error) {
    return validationError(validation.error);
  }

  const { id, ...data } = validation.data;
  if (!id) throw new Error("ID is was not found");

  const updateCategory = await upsertAccountCategory(client, {
    id,
    ...data,
    updatedBy: userId,
  });
  if (updateCategory.error) {
    return redirect(
      "/x/accounting/categories",
      await flash(
        request,
        error(updateCategory.error, "Failed to update G/L account category")
      )
    );
  }

  return redirect(
    "/x/accounting/categories",
    await flash(request, success("Updated G/L account category "))
  );
}

export default function EditAccountCategoryRoute() {
  const { accountCategory } = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  const onClose = () => navigate("/x/accounting/categories/");

  const initialValues = {
    ...accountCategory,
  };

  return (
    <AccountCategoryForm onClose={onClose} initialValues={initialValues} />
  );
}
