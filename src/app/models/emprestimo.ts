export interface Emprestimo{
  
  id?: string;
  leitor: string;
  email: string;
  telefone: string;
  status: string;
  livro: {
    autor: string,
    capa: string,
    categoria: string,
    id?: string,
    isbn: string,
    titulo: string
  };
  dataEmprestimo?: string;
}
