interface StoryIconProps {
  className?: string;
}

export function InfoStoryIcon({ className }: StoryIconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      focusable="false"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />

      <path d="M12 11V17" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />

      <circle cx="12" cy="7.5" r="1" fill="currentColor" />
    </svg>
  );
}

export function WarningStoryIcon({ className }: StoryIconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      focusable="false"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 3L22 20H2L12 3Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" />

      <path d="M12 9V14" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />

      <circle cx="12" cy="17" r="1" fill="currentColor" />
    </svg>
  );
}

export function SuccessStoryIcon({ className }: StoryIconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      focusable="false"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />

      <path
        d="M8 12L10.5 14.5L16 9"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

export function ErrorStoryIcon({ className }: StoryIconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      focusable="false"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />

      <path d="M9 9L15 15M15 9L9 15" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
    </svg>
  );
}

export function NoticeStoryIcon({ className }: StoryIconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      focusable="false"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 3L14.4 8.1L20 8.8L15.9 12.7L17 18.3L12 15.5L7 18.3L8.1 12.7L4 8.8L9.6 8.1L12 3Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}
