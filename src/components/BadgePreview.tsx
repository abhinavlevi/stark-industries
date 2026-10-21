import React, { useState } from 'react';
import { RotateCw, Download, Share2, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { BadgeSide, EmployeeProfile } from '../types/badge';
import { BadgeShell, BADGE_SIZES } from './badges/BadgeShell';
import { StarkCardFront } from './badges/StarkCardFront';
import { StarkCardBack } from './badges/StarkCardBack';
import { StarkCardFrontHorizontal } from './badges/StarkCardFrontHorizontal';
import { StarkCardBackHorizontal } from './badges/StarkCardBackHorizontal';
import { exportBadgeAsPng } from '../utils/export';
import { serializeBadgeToUrl } from '../utils/urlState';
import { soundFx } from '../utils/audio';

interface BadgePreviewProps {
  side: BadgeSide;
  profile: EmployeeProfile;
  onToggleSide: () => void;
}

export const BadgePreview: React.FC<BadgePreviewProps> = ({
  side,
  profile,
  onToggleSide,
}) => {
  const [isExporting, setIsExporting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(
    null
  );

  const { width: currentWidth, height: currentHeight } = BADGE_SIZES[profile.orientation];

  const handleDownload = async () => {
    if (isExporting) return;
    setIsExporting(true);
    setFeedback(null);

    try {
      const cardEl = document.getElementById('stark-industries-id-card');
      if (!cardEl) {
        throw new Error('Badge element not found in DOM.');
      }

      const filename = await exportBadgeAsPng({
        cardElement: cardEl,
        side,
        orientation: profile.orientation,
        badgeNumber: profile.badgeNumber || 'TS-001-000',
      });

      setFeedback({
        type: 'success',
        message: `High-resolution PNG downloaded: ${filename}`,
      });
    } catch (err) {
      setFeedback({
        type: 'error',
        message: err instanceof Error ? err.message : 'Export failed. Please try again.',
      });
    } finally {
      setIsExporting(false);
      setTimeout(() => {
        setFeedback((prev) => (prev?.type === 'success' ? null : prev));
      }, 4000);
    }
  };

  const handleShare = async () => {
    soundFx.playClick();
    setFeedback(null);

    const shareUrl = serializeBadgeToUrl(side, profile);
    const shareTitle = `Stark Industries ID — ${profile.name || 'Security Pass'}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: `Stark Industries ${profile.role || 'Personnel'} Badge (${profile.badgeNumber})`,
          url: shareUrl,
        });
        setFeedback({
          type: 'success',
          message: 'Badge link shared.',
        });
        return;
      } catch (err: unknown) {
        if ((err as Error)?.name === 'AbortError') return;
      }
    }

    try {
      await navigator.clipboard.writeText(shareUrl);
      setFeedback({
        type: 'success',
        message: 'Badge link copied to clipboard!',
      });
    } catch {
      setFeedback({
        type: 'error',
        message: 'Could not copy link.',
      });
    }

    setTimeout(() => {
      setFeedback((prev) => (prev?.type === 'success' ? null : prev));
    }, 4000);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Top Controls Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Live Preview
          </span>
          <span className="px-2 py-0.5 rounded-full bg-blue-50 text-[#0077B6] border border-blue-200 text-[11px] font-semibold">
            {profile.orientation === 'vertical' ? 'Vertical 320×490' : 'Horizontal 500×335'}
          </span>
          <span className="text-xs text-slate-400">•</span>
          <span className="text-xs font-semibold text-slate-600 capitalize">
            {side} side
          </span>
        </div>

        {/* Flip Side Button */}
        <button
          type="button"
          onClick={() => {
            soundFx.playClick();
            onToggleSide();
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 text-xs font-semibold text-slate-700 shadow-2xs transition-all cursor-pointer"
          aria-label={side === 'front' ? 'Flip to show card back' : 'Flip to show card front'}
        >
          <RotateCw className="w-3.5 h-3.5 text-[#0077B6]" />
          <span>{side === 'front' ? 'Show Back Side' : 'Show Front Side'}</span>
        </button>
      </div>

      {/* Light Mode Preview Pedestal */}
      <div
        className="w-full rounded-2xl border border-slate-200 bg-[#F1F5F9] p-6 sm:p-10 flex items-center justify-center min-h-[560px] overflow-hidden shadow-inner relative"
        style={{
          backgroundImage:
            'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.9) 0%, transparent 80%), linear-gradient(rgba(148, 163, 184, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(148, 163, 184, 0.1) 1px, transparent 1px)',
          backgroundSize: '100% 100%, 20px 20px, 20px 20px',
        }}
      >
        {/* The Exact Badge */}
        <div className="relative z-10 transition-transform duration-200">
          <BadgeShell
            side={side}
            orientation={profile.orientation}
            showHolderClip={profile.showHolderClip}
          >
            {profile.orientation === 'vertical' ? (
              side === 'front' ? (
                <StarkCardFront profile={profile} />
              ) : (
                <StarkCardBack profile={profile} />
              )
            ) : side === 'front' ? (
              <StarkCardFrontHorizontal profile={profile} />
            ) : (
              <StarkCardBackHorizontal />
            )}
          </BadgeShell>
        </div>
      </div>

      {/* Feedback Banner */}
      {feedback && (
        <div
          className={`flex items-center gap-2 p-3 rounded-xl border text-xs font-medium transition-all ${
            feedback.type === 'success'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
              : 'bg-rose-50 border-rose-200 text-rose-800'
          }`}
        >
          {feedback.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
          ) : (
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
          )}
          <span className="flex-1">{feedback.message}</span>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <button
          type="button"
          onClick={handleDownload}
          disabled={isExporting}
          className="w-full sm:flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#0077B6] hover:bg-[#026aa2] active:bg-[#025b8b] text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all cursor-pointer disabled:opacity-60"
        >
          {isExporting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Generating Badge…</span>
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              <span>Download ID Card (PNG)</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={handleShare}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 shadow-2xs transition-all cursor-pointer"
        >
          <Share2 className="w-4 h-4 text-[#0077B6]" />
          <span>Share</span>
        </button>
      </div>

      <p className="text-[11px] text-slate-400 text-center">
        Exports active {side} face in 3× resolution ({currentWidth * 3} × {currentHeight * 3} px).
      </p>
    </div>
  );
};
