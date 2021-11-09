export function ErrorMessage({ error }: { error: string }) {
  return (
    <label aria-errormessage={error} className="text-error">
      {error}
    </label>
  );
}
