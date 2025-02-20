/* eslint-disable react-refresh/only-export-components */
import { useState, useCallback, memo } from 'react';
import styles from './styles/styles.module.css';

interface Param {
  id: number;
  name: string;
  type: 'string';
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface Color {
  id: number;
  name: string;
  value: string;
}

interface Model {
  paramValues: ParamValue[];
  colors: Color[];
}

interface Props {
  params: Param[];
  model: Model;
}

const ParamInput = memo(
  ({
    param,
    value,
    onChange,
  }: {
    param: Param;
    value: string;
    onChange: (id: number, value: string) => void;
  }) => (
    <label key={param.id} className={styles.label}>
      {param.name}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(param.id, e.target.value)}
        className={styles.input}
      />
    </label>
  ),
);

function ParamEditor({ params, model }: Props) {
  const [paramValues, setParamValues] = useState<ParamValue[]>(model.paramValues);

  const handleParamChange = useCallback((paramId: number, value: string) => {
    setParamValues((prevValues) => {
      const existingValueIndex = prevValues.findIndex((pv) => pv.paramId === paramId);
      if (existingValueIndex !== -1) {
        const updatedValues = [...prevValues];
        updatedValues[existingValueIndex] = { paramId, value };
        return updatedValues;
      }
      return [...prevValues, { paramId, value }];
    });
  }, []);

  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title}>Редактор параметров</h2>
      <form className={styles.form}>
        {params.map((param) => (
          <ParamInput
            key={param.id}
            param={param}
            value={paramValues.find((pv) => pv.paramId === param.id)?.value || ''}
            onChange={handleParamChange}
          />
        ))}
      </form>
    </section>
  );
}

export const testParams: Param[] = [
  {
    id: 1,
    name: 'Назначение',
    type: 'string',
  },
  {
    id: 2,
    name: 'Длина',
    type: 'string',
  },
];

export const testModel: Model = {
  paramValues: [
    {
      paramId: 1,
      value: 'повседневное',
    },
    {
      paramId: 2,
      value: 'макси',
    },
  ],
  colors: [],
};

export default ParamEditor;
