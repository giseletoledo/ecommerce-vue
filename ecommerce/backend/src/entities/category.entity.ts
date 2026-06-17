// A entity encapsula as regras de negócio da categoria.
// Nenhuma camada externa (service, controller) cria um objeto Category
// diretamente via `new` — tudo passa pelo método estático `create`.

export class Category {
  private constructor(
    public readonly id: string,
    public name: string,
    public readonly createdAt: Date,
  ) {}

  // ─── Fábrica estática ──────────────────────────────────
  // Garante que uma categoria nunca nasce com nome inválido.
  // Chamado pelo CategoryService ao criar uma nova categoria.
  static create(id: string, name: string): Category {
    const trimmed = name.trim()

    if (trimmed.length < 3) {
      throw new Error('O nome da categoria deve ter no mínimo 3 caracteres.')
    }

    if (trimmed.length > 100) {
      throw new Error('O nome da categoria deve ter no máximo 100 caracteres.')
    }

    return new Category(id, trimmed, new Date())
  }

  // ─── Reconstrói a partir do banco ─────────────────────
  // Usado pelo repository quando carrega dados já persistidos.
  // Não valida regras porque os dados já passaram por `create` antes.
  static restore(id: string, name: string, createdAt: Date): Category {
    return new Category(id, name, createdAt)
  }

  // ─── Regra de negócio: renomear ────────────────────────
  // O CategoryService chama este método no fluxo de update,
  // garantindo que o novo nome também passe pelas mesmas regras.
  rename(newName: string): void {
    const trimmed = newName.trim()

    if (trimmed.length < 3) {
      throw new Error('O novo nome deve ter no mínimo 3 caracteres.')
    }

    if (trimmed.length > 100) {
      throw new Error('O novo nome deve ter no máximo 100 caracteres.')
    }

    this.name = trimmed
  }
}