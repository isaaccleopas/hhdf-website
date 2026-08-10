defmodule HhdfWebsite.MixProject do
  use Mix.Project

  def project do
    [
      app: :hhdf_website,
      version: "0.1.0",
      elixir: "~> 1.15",
      start_permanent: Mix.env() == :prod,
      deps: deps(),
      aliases: aliases()
    ]
  end

  def application do
    [
      extra_applications: [:logger],
      mod: {HhdfWebsite.Application, []}
    ]
  end

  defp deps do
    [
      {:bandit, "~> 1.6"},
      {:plug, "~> 1.16"}
    ]
  end

  defp aliases do
    [
      start: ["deps.get", "run --no-halt"]
    ]
  end
end
