import { Panel, PanelHeader } from '@/components/layout';

import { FieldList } from './FieldList';
import { ShowAllFieldsButton } from './ShowAllFieldsButton';

import type { ReactElement } from 'react';

export const FieldsPanel = (): ReactElement => {
  return (
    <Panel>
      <PanelHeader title="Поля">
        <ShowAllFieldsButton />
      </PanelHeader>
      <FieldList />
    </Panel>
  );
};
