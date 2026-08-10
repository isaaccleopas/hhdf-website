defmodule HhdfWebsite.Router do
  @moduledoc false
  use Plug.Router

  @root Path.expand("../..", __DIR__)

  plug Plug.Logger

  plug Plug.Static,
    at: "/",
    from: @root,
    gzip: false

  plug :match
  plug :dispatch

  get "/" do
    conn
    |> put_resp_content_type("text/html")
    |> send_file(200, Path.join(@root, "index.html"))
  end

  match _ do
    send_resp(conn, 404, "Not found")
  end
end
