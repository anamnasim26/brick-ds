// Illustration image assets sourced from Figma — valid for ~7 days from generation.
// Replace with locally hosted assets when they expire.

const NO_RESULTS_BG   = 'https://www.figma.com/api/mcp/asset/6e2a83b1-1439-4bec-89e8-3f61b8550d0d';
const NO_RESULTS_MAIN = 'https://www.figma.com/api/mcp/asset/b6cc3ee7-8838-4122-ad3b-c9d7552ebe27';
const NO_RESULTS_DECO = 'https://www.figma.com/api/mcp/asset/1b6db599-1129-41a6-b749-e8d2ebea6f5e';

const NO_DATA_CACTUS  = 'https://www.figma.com/api/mcp/asset/11ceb010-9ab8-4785-978b-dac9a6fbfc38';
const NO_DATA_CLOUD   = 'https://www.figma.com/api/mcp/asset/6777fc9f-5485-42cf-803b-23ba4f057b50';
const NO_DATA_MAIN    = 'https://www.figma.com/api/mcp/asset/51da71db-26fc-4af6-8377-b195cc879864';

const ERROR_BG        = 'https://www.figma.com/api/mcp/asset/993b393a-338c-4cf8-b282-f3913271d0dd';
const ERROR_STAR      = 'https://www.figma.com/api/mcp/asset/fa0e13e1-65eb-4eb4-bcb9-635e070b8af7';
const ERROR_SPARKLE   = 'https://www.figma.com/api/mcp/asset/b0b401fb-d45e-421f-8a7b-d9f0a312209f';
const ERROR_GHOST     = 'https://www.figma.com/api/mcp/asset/14609067-79b2-4e97-b98b-5e56da8cc9cd';

export type IllustrationType = 'No Data' | 'No Results' | 'Error_404';

export interface IllustrationProps {
  type?: IllustrationType;
  className?: string;
}

export function Illustration({ type = 'No Data', className }: IllustrationProps) {
  return (
    <div className={`relative size-[161px] shrink-0 ${type === 'No Data' ? 'overflow-clip' : ''} ${className ?? ''}`}>

      {/* ── No Results ─────────────────────────────────────── */}
      {type === 'No Results' && (
        <>
          <div className="absolute h-[118px] left-[17px] top-[23px] w-[127px]">
            <img alt="" className="absolute inset-0 block size-full max-w-none" src={NO_RESULTS_BG} />
          </div>
          <div className="absolute h-[81px] left-[49px] top-[41px] w-[63px]">
            <img alt="" className="absolute inset-0 block size-full max-w-none" src={NO_RESULTS_MAIN} />
          </div>
          <div className="absolute h-[112px] left-[39px] top-[25px] w-[82px]">
            <img alt="" className="absolute inset-0 block size-full max-w-none" src={NO_RESULTS_DECO} />
          </div>
        </>
      )}

      {/* ── No Data ────────────────────────────────────────── */}
      {type === 'No Data' && (
        <>
          <div className="absolute flex h-[195px] w-[195px] items-center justify-center left-[-22px] top-[-2px]">
            <div className="flex-none rotate-[44.84deg]">
              <div className="relative h-[126px] w-[150px]">
                <img alt="" className="absolute inset-0 block size-full max-w-none" src={NO_DATA_CACTUS} />
              </div>
            </div>
          </div>
          <div className="absolute flex h-[49px] w-[42px] items-center justify-center left-[100px] top-[15px]">
            <div className="-scale-y-100 flex-none">
              <div className="relative h-[49px] w-[42px]">
                <img alt="" className="absolute inset-0 block size-full max-w-none" src={NO_DATA_CLOUD} />
              </div>
            </div>
          </div>
          <div className="absolute inset-[16.9%_15.8%_9.94%_11.04%]">
            <img alt="" className="absolute inset-0 block size-full max-w-none" src={NO_DATA_MAIN} />
          </div>
        </>
      )}

      {/* ── Error 404 ──────────────────────────────────────── */}
      {type === 'Error_404' && (
        <>
          <div className="absolute h-[91px] left-[13px] top-[30px] w-[135px]">
            <img alt="" className="absolute inset-0 block size-full max-w-none" src={ERROR_BG} />
          </div>
          <div className="absolute size-[28px] left-[13px] top-[41px]">
            <img alt="" className="absolute inset-0 block size-full max-w-none" src={ERROR_STAR} />
          </div>
          <div className="absolute h-[19px] w-[20px] left-[47px] top-[34px]">
            <div className="absolute inset-[0_-10%_-21%_-10%]">
              <img alt="" className="block size-full max-w-none" src={ERROR_SPARKLE} />
            </div>
          </div>
          <div className="absolute h-[58px] w-[43px] left-[14px] top-[48px]">
            <img alt="" className="absolute inset-0 block size-full max-w-none" src={ERROR_GHOST} />
          </div>
          {/* 404 text — rendered in code to avoid image dependency */}
          <div className="absolute left-[52px] top-[31px] flex flex-col items-center">
            <span className="font-['Source_Sans_Pro',sans-serif] text-[48px] leading-none text-brick-blue-500 font-normal">404</span>
            <span className="font-['Source_Sans_Pro',sans-serif] text-[24px] leading-none text-brick-blue-500 font-normal tracking-widest">ERROR</span>
          </div>
        </>
      )}

    </div>
  );
}
