import React from 'react';
import { SHEET } from '../data/pricing.js';
import { sheetBlocks, sheetFill } from '../utils/packing.js';
import { fillBar } from '../utils/format.js';

/**
 * The shared production sheet. Other customers' artwork is NEVER shown —
 * their orders are anonymous grey blocks. The current order is red.
 */
export default function SheetVisualiser({ sheet, note, status }) {
  if (!sheet) return null;
  const fill = sheetFill(sheet);

  return (
    <div className="rf-card" style={{ padding: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 12, flexWrap: 'wrap' }}>
        <div>
          <div className="rf-meta">CURRENT PRINT SHEET</div>
          <div style={{ fontFamily: 'var(--rf-display)', fontWeight: 900, fontSize: 32, letterSpacing: '.04em' }}>SHEET #{String(sheet.id).padStart(2, '0')}</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontFamily: 'var(--rf-display)', fontWeight: 900, fontSize: 32, color: 'var(--rf-red)' }}>{fill}%</div>
          <div className="rf-meta" style={{ fontSize: 9 }}>{status || `FILLED · ${SHEET.w} × ${SHEET.h} CM`}</div>
        </div>
      </div>

      <div style={{ fontFamily: 'var(--rf-mono)', fontSize: 13, letterSpacing: '.12em', color: 'var(--rf-red)', marginTop: 10 }}>{fillBar(fill)}</div>

      <div style={{ position: 'relative', aspectRatio: `${SHEET.w} / ${SHEET.h}`, marginTop: 14, background: '#EDEDEA', border: '1px solid var(--rf-line)', overflow: 'hidden' }}>
        {sheetBlocks(sheet).map((b) => (
          <div key={b.key} style={{ position: 'absolute', left: b.left, top: b.top, width: b.width, height: b.height, background: b.mine ? 'var(--rf-red)' : '#B6B6B2', border: `1px solid ${b.mine ? 'var(--rf-red-deep)' : '#A2A29E'}`, display: 'grid', placeItems: 'center', fontFamily: 'var(--rf-mono)', fontSize: 8, letterSpacing: '.1em', color: '#fff' }}>
            {b.mine ? 'YOU' : ''}
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: 14 }} className="rf-meta">
        <span style={{ display: 'flex', alignItems: 'center', gap: 7 }}><i style={{ width: 11, height: 11, background: 'var(--rf-red)' }} />YOUR ORDER</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 7 }}><i style={{ width: 11, height: 11, background: '#B6B6B2' }} />OTHER ORDERS</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 7 }}><i style={{ width: 11, height: 11, background: '#EDEDEA', border: '1px solid #9C9C98' }} />AVAILABLE</span>
      </div>

      {note && <div style={{ marginTop: 14, padding: 14, background: 'var(--rf-surface-2)', borderLeft: '2px solid var(--rf-red)', fontSize: 14, lineHeight: 1.55, color: '#B9B9C0' }}>{note}</div>}
    </div>
  );
}
