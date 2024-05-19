<?php

namespace App\Controller;

use App\Entity\Todo;
use App\Form\TodoType;
use App\Repository\TodoRepository;
use Doctrine\DBAL\Exception\UniqueConstraintViolationException;
use Doctrine\ORM\EntityManagerInterface;
use Exception;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/todo', name: 'api_todo')]
class TodoController extends AbstractController
{
    private EntityManagerInterface $entityManager;
    private TodoRepository $todoRepository;

    public function __construct(EntityManagerInterface $entityManager, TodoRepository $todoRepository)
    {
        $this->entityManager = $entityManager;
        $this->todoRepository = $todoRepository;
    }

    private function validateForm($content): array
    {
        // Remove ID from content before submitting to form (otherwise we get extra field error)
        $nonObject = (array)$content;
        unset($nonObject['id']);

        $form = $this->createForm(TodoType::class);
        $form->submit($nonObject);

        if ($form->isValid())
            return [true, []];

        $errors = [];
        foreach ($form->getErrors(true, true) as $error) {
            $propertyName = $error->getOrigin()->getName();
            $errors[$propertyName] = $error->getMessage();
        }

        return [false, $this->json([
            'message' => ['text' => implode("\n", $errors), 'level' => 'error']
        ])];
    }

    #[Route('/read', name: 'api_todo_read', methods: ['GET'])]
    public function read(): JsonResponse
    {
        $todos = $this->todoRepository->findAll();

        $arrayOfTodos = [];
        foreach ($todos as $todo) {
            $arrayOfTodos[] = $todo->toArray();
        }

        return $this->json($arrayOfTodos);
    }

    #[Route('/create', name: 'api_todo_create', methods: ['POST'])]
    public function create(Request $request): JsonResponse
    {
        $content = json_decode($request->getContent());

        [$formValid, $errors] = $this->validateForm($content);
        if (!$formValid)
            return $errors;

        $todo = new Todo();
        $todo->setTask($content->task);
        $todo->setDescription($content->description);

        try {
            $this->entityManager->persist($todo);
            $this->entityManager->flush();

            return $this->json([
                'todo' => $todo->toArray(),
                'message' => ['text' => 'Task created successfully', 'level' => 'success'],
            ]);
        } catch (UniqueConstraintViolationException $exception) {
            return $this->json([
                'message' => ['text' => 'Task must be unique', 'level' => 'error'],
            ]);
        } catch (Exception $exception) {
            return $this->json([
                'message' => ['text' => 'Error while trying to submit task to the database', 'level' => 'error'],
            ]);
        }
    }

    #[Route('/update', name: 'api_todo_update', methods: ['PUT'])]
    public function update(Request $request): JsonResponse
    {
        $content = json_decode($request->getContent());

        [$formValid, $errors] = $this->validateForm($content);
        if (!$formValid)
            return $errors;

        $todo = $this->todoRepository->findOneBy(['id' => $content->id]);

        if ($todo->getTask() === $content->task && $todo->getDescription() === $content->description) {
            return $this->json([
                'message' => ['text' => 'There was no change to the task. Neither the task or the description were changed.', 'level' => 'error'],
            ]);
        }

        $todo->setTask($content->task);
        $todo->setDescription($content->description);

        try {
            $this->entityManager->flush();

            return $this->json([
                'todo' => $todo->toArray(),
                'message' => ['text' => 'Task updated successfully', 'level' => 'success'],
            ]);
        } catch (UniqueConstraintViolationException $exception) {
            return $this->json([
                'message' => ['text' => 'Task must be unique', 'level' => 'error'],
            ]);
        } catch (Exception $exception) {
            return $this->json([
                'message' => ['text' => 'Error while trying to update task in the database', 'level' => 'error'],
            ]);
        }
    }

    #[Route('/delete', name: 'api_todo_delete', methods: ['DELETE'])]
    public function delete(Request $request): JsonResponse
    {
        $content = json_decode($request->getContent());

        $todo = $this->todoRepository->findOneBy(['id' => $content->id]);

        try {
            $this->entityManager->remove($todo);
            $this->entityManager->flush();

            return $this->json([
                'message' => ['text' => 'Task deleted successfully', 'level' => 'success'],
            ]);
        } catch (Exception $exception) {
            return $this->json([
                'message' => ['text' => 'Error while trying to delete task in the database', 'level' => 'error'],
            ]);
        }
    }
}
