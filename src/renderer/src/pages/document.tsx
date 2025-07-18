import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { Editor, OnContentUpdatedParams } from '../components/Editor'
import { ToC } from '../components/ToC'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Document as IPCDocument } from '@/shared/types/ipc'

export function Document() {
  const { id } = useParams<{ id: string }>()
  const queryClient = useQueryClient()

  const { data, isFetching } = useQuery({
    queryKey: ['documents', id],
    queryFn: async () => {
      const response = await window.api.fetchDocument({ id: id! })

      return response.data
    },
  })

  const { mutateAsync: saveDocument } = useMutation({
    mutationFn: async ({
      title,
      subtitle,
      content,
    }: OnContentUpdatedParams) => {
      await window.api.saveDocument({
        id: id!,
        title,
        subtitle,
        content,
      })
    },
    onSuccess: (_, { title }) => {
      queryClient.setQueryData<IPCDocument[]>(['documents'], (documents) => {
        return documents?.map((document) => {
          if (document.id === id) {
            return { ...document, title }
          } else {
            return document
          }
        })
      })
    },
  })

  const initialContent = useMemo(() => {
    if (data) {
      return `<h1>${data.title}</h1><h2>${data.subtitle}</h2>${
        data.content ?? '<p></p>'
      }`
    }

    return ''
  }, [data])

  const formattedTitle = data?.title.replace(/<[^>]+>/g, '')
  const formattedSubtitle = data?.subtitle?.replace(/<[^>]+>/g, '')

  function handleEditorContentUpdated({
    title,
    subtitle,
    content,
  }: OnContentUpdatedParams) {
    saveDocument({ title, subtitle, content })
  }

  return (
    <main className="flex-1 flex py-12 px-10 gap-8">
      <aside className="hidden lg:block sticky top-0">
        <span className="text-rotion-300 font-semibold text-xs">
          TABLE OF CONTENTS
        </span>

        <ToC.Root>
          <ToC.Link>{formattedTitle}</ToC.Link>
          <ToC.Section>{formattedSubtitle}</ToC.Section>
        </ToC.Root>
      </aside>

      <section className="flex-1 flex flex-col items-center">
        {!isFetching && data && (
          <Editor
            onContentUpdated={handleEditorContentUpdated}
            content={initialContent}
          />
        )}
      </section>
    </main>
  )
}
