import { useEffect } from "react";
import { http } from "../api/http";

/**
 * Custom hook to fetch and apply SEO meta tags.
 * @param {string} entityType - e.g., 'PAGE', 'PROJECT', 'SERVICE'
 * @param {string} entityKey - e.g., 'home', 'project-slug'
 */
export function useSEO(entityType, entityKey) {
  useEffect(() => {
    if (!entityType || !entityKey) return;

    async function fetchSEO() {
      try {
        const { data } = await http.get("/api/seo", {
          params: { entityType, entityKey },
        });

        if (data) {
          if (data.metaTitle) document.title = data.metaTitle;
          
          let metaDesc = document.querySelector('meta[name="description"]');
          if (data.metaDesc) {
            if (!metaDesc) {
              metaDesc = document.createElement("meta");
              metaDesc.name = "description";
              document.head.appendChild(metaDesc);
            }
            metaDesc.setAttribute("content", data.metaDesc);
          }
        }
      } catch (err) {
        console.error("SEO fetch error:", err);
      }
    }

    fetchSEO();
  }, [entityType, entityKey]);
}
