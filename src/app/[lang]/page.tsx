export default async function Page({ params }: PageProps<"/[lang]/demo">) {
  const { lang } = await params;
  return <h1 className="text-2xl font-bold">Hello world! {lang}</h1>;
}
