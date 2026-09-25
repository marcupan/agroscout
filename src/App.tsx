import { useCallback, useState } from 'react';

import { FieldsPanel } from '@/components/fields';
import {
  AppShell,
  AppShellHeader,
  AppShellMain,
  AppShellSidebar,
  ErrorBoundary,
  Header,
} from '@/components/layout';
import { FieldMap } from '@/components/map';
import { PointFormModal, PointsPanel } from '@/components/points';
import { ToastProvider, useToast } from '@/components/ui';
import { POINT_TYPE_LABEL } from '@/lib/pointTypes';
import { useFieldsStore } from '@/store/useFieldsStore';
import { usePointsStore } from '@/store/usePointsStore';

import type { FieldMapProps } from '@/components/map';
import type { LatLng, MonitoringPoint } from '@/types';
import type { ReactElement } from 'react';

export const App = (): ReactElement => {
  return (
    <ErrorBoundary fallbackTitle="Застосунок зупинився через помилку">
      <ToastProvider>
        <Workspace />
      </ToastProvider>
    </ErrorBoundary>
  );
};

const AppHeader = (): ReactElement => {
  const fieldCount = useFieldsStore((state) => state.fields.length);
  const pointCount = usePointsStore((state) => state.points.length);

  const stats = [
    { label: 'Поля', value: String(fieldCount) },
    { label: 'Точки', value: String(pointCount) },
  ];

  return <Header title="Агроскаут" subtitle="Моніторинг сільськогосподарських полів" stats={stats} />;
};

const Workspace = (): ReactElement => {
  const { showToast } = useToast();
  const [draft, setDraft] = useState<LatLng | null>(null);

  const selectedFieldId = useFieldsStore((state) => state.selectedFieldId);
  const selectedField = useFieldsStore(
    (state) => state.fields.find((field) => field.properties.id === state.selectedFieldId) ?? null,
  );

  const handleAddPointRequest = useCallback((point: LatLng): void => {
    setDraft(point);
  }, []);

  const handleInvalidClick = useCallback<FieldMapProps['onInvalidClick']>(
    (reason, fieldName): void => {
      if (reason === 'no-field-selected') {
        showToast('Спочатку оберіть поле у списку або на карті.', 'info');

        return;
      }

      showToast(`Точку можна додати лише в межах поля «${fieldName ?? 'обране поле'}».`, 'warn');
    },
    [showToast],
  );

  const handleCreated = useCallback(
    (point: MonitoringPoint): void => {
      showToast(`Точку додано: ${POINT_TYPE_LABEL[point.type]}`, 'success');
    },
    [showToast],
  );

  const closeDraft = useCallback((): void => {
    setDraft(null);
  }, []);

  return (
    <>
      <AppShell>
        <AppShellHeader>
          <AppHeader />
        </AppShellHeader>
        <AppShellMain>
          <ErrorBoundary fallbackTitle="Карта не завантажилась">
            <FieldMap onAddPointRequest={handleAddPointRequest} onInvalidClick={handleInvalidClick} />
          </ErrorBoundary>
        </AppShellMain>
        <AppShellSidebar>
          <FieldsPanel />
          <PointsPanel />
        </AppShellSidebar>
      </AppShell>
      <PointFormModal
        open={draft !== null}
        coords={draft}
        fieldId={selectedFieldId}
        fieldName={selectedField?.properties.name ?? null}
        onClose={closeDraft}
        onCreated={handleCreated}
      />
    </>
  );
};
