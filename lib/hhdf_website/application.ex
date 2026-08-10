defmodule HhdfWebsite.Application do
  @moduledoc false
  use Application

  @impl true
  def start(_type, _args) do
    children = [
      {Bandit, plug: HhdfWebsite.Router, scheme: :http, port: port()}
    ]

    opts = [strategy: :one_for_one, name: HhdfWebsite.Supervisor]
    Supervisor.start_link(children, opts)
  end

  defp port do
    case System.get_env("PORT") do
      nil -> 4000
      value -> String.to_integer(value)
    end
  end
end
