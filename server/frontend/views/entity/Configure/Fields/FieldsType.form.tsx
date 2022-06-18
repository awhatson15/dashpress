import { FormButton, FormInput, FormSelect } from "@gothicgeeks/design-system";
import { IEntityField } from "../../../../../backend/entities/types";
import { Form, Field } from "react-final-form";
import {
  ButtonLang,
  composeValidators,
  maxLength,
  minLength,
} from "@gothicgeeks/shared";
import { ENTITY_TYPES_SELECTION_BAG } from "../../../../../shared/validations.constants";

export const FieldsTypeForm: React.FC<{
  fields: IEntityField[];
  initialValues?: Record<string, unknown>;
  onSubmit: (data: Record<string, unknown>) => void;
  getEntityFieldLabels: (fieldName: string) => string,
}> = ({ onSubmit, initialValues, fields, getEntityFieldLabels }) => {
  // Will have do decipher the default types here
  return (
    <Form
      onSubmit={onSubmit}
      initialValues={initialValues}
      render={({ handleSubmit, submitting }) => {
        return (
          <form onSubmit={handleSubmit}>
            {fields.map(({ name }) => {
              return (
                <Field
                  key={name}
                  name={name}
                  validate={composeValidators(minLength(2), maxLength(64))}
                  validateFields={[]}
                >
                  {(renderProps) => (
                    <FormSelect
                      label={getEntityFieldLabels(name)}
                      selectData={Object.keys(ENTITY_TYPES_SELECTION_BAG).map(
                        (type) => ({ label: type, value: type })
                      )}
                      nullable={true}
                      {...renderProps}
                    />
                  )}
                </Field>
              );
            })}
            <FormButton text={ButtonLang.upsert} isMakingRequest={submitting} />
          </form>
        );
      }}
    />
  );
};

 // entity_columns_labels: { requireEntity: true, defaultValue: {
  //   label: string,
  //   type: string,
  //   validations:[
  //     {
  //       type: "required",
  //     },
  //     {
  //       type: "postiveNumber",
  //     },
  //     {
  //     },
  //     {
  //       type: "matchOtherField",
  //       value: ""
  //     },
  //     {
  //       type: "unique",
  //     },
  //     {
  //       _type: "requiredIf",
  //       field: "",
  //     },
  //     {
  //     _type: "regex",
  //     value: "\\"
  //   },
  //   {
  //     _type: "min",
  //     value: number
  //   },
  //   {
  //     _type: "max",
  //     value: number
  //   }
  // ]
  // } }, // {key: label}