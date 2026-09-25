import { Panel, PanelBody, PanelHeader } from '@/components/layout';
import { useFieldsStore } from '@/store/useFieldsStore';

import { PointFilters } from './PointFilters';
import { PointList } from './PointList';

import type { ReactElement } from 'react';

export const PointsPanel = (): ReactElement => {
  const selectedFieldId = useFieldsStore((state) => state.selectedFieldId);
  const selectedField = useFieldsStore(
    (state) => state.fields.find((field) => field.properties.id === state.selectedFieldId) ?? null,
  );

  const title = selectedField ? `Точки · ${selectedField.properties.name}` : 'Усі точки';

  return (
    <Panel fill>
      <PanelHeader title={title} />
      <PointFilters />
      <PanelBody scroll>
        <PointList fieldId={selectedFieldId} />
      </PanelBody>
    </Panel>
  );
};
