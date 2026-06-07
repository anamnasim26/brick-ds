import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/lib/theme';
import { TopNav } from '@/components/layout/TopNav';
import { Landing } from '@/pages/Landing';
import { SetupPage } from '@/pages/SetupPage';
import { FoundationsLayout, FoundationsIndex } from '@/pages/foundations/FoundationsLayout';
import { ComponentsLayout } from '@/pages/components/ComponentsLayout';
import { ComponentsIndexPage } from '@/pages/components/ComponentsIndex';
import { Colours } from '@/pages/foundations/Colours';
import { Typography } from '@/pages/foundations/Typography';
import { Spacing } from '@/pages/foundations/Spacing';
import { Radius } from '@/pages/foundations/Radius';
import { AlertPage } from '@/pages/components/AlertPage';
import { AvatarPage } from '@/pages/components/AvatarPage';
import { BadgePage } from '@/pages/components/BadgePage';
import { ButtonPage } from '@/pages/components/ButtonPage';
import { CheckboxPage } from '@/pages/components/CheckboxPage';
import { EmptyStatePage } from '@/pages/components/EmptyStatePage';
import { InputPage } from '@/pages/components/InputPage';
import { RadioPage }   from '@/pages/components/RadioPage';
import { TooltipPage } from '@/pages/components/TooltipPage';
import { SwitchPage }  from '@/pages/components/SwitchPage';

export default function App() {
  return (
    <ThemeProvider>
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-brick-grey-100">
        <TopNav />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/setup" element={<SetupPage />} />
          <Route path="/foundations" element={<FoundationsLayout />}>
            <Route index element={<FoundationsIndex />} />
            <Route path="colours" element={<Colours />} />
            <Route path="typography" element={<Typography />} />
            <Route path="spacing" element={<Spacing />} />
            <Route path="radius" element={<Radius />} />
          </Route>
          <Route path="/components" element={<ComponentsLayout />}>
            <Route index element={<ComponentsIndexPage />} />
            <Route path="alert" element={<AlertPage />} />
            <Route path="avatar" element={<AvatarPage />} />
            <Route path="badge" element={<BadgePage />} />
            <Route path="button"   element={<ButtonPage />} />
            <Route path="checkbox"    element={<CheckboxPage />} />
            <Route path="empty-state" element={<EmptyStatePage />} />
            <Route path="input"       element={<InputPage />} />
            <Route path="radio"       element={<RadioPage />} />
            <Route path="tooltip"     element={<TooltipPage />} />
            <Route path="switch"      element={<SwitchPage />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
    </ThemeProvider>
  );
}
